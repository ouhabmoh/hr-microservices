### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\jest.config.ts

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html']
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\output_file.ts



### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\prisma\schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int    @id @default(autoincrement())
  firstName String
  lastName  String
  email     String @unique
  username  String @unique

  password        String
  role            Role     @default(CANDIDATE)
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt        DateTime?   // Field to indicate soft deletion
  Token           Token[]

  resumes     Resume[]
  jobs        Job[]
  Application Application[]
}

model Job {
  id             Int           @id @default(autoincrement())
  title          String
  description    String
  location       String
  employmentType String
  deadline       DateTime
  isClosed         Boolean    @default(false) // New field to indicate if the job is closed

  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  recruiter      User          @relation(fields: [recruiterId], references: [id])
  recruiterId    Int
  applications   Application[]
}

model Application {
  id          Int      @id @default(autoincrement())
  job         Job      @relation(fields: [jobId], references: [id])
  jobId       Int
  candidate   User     @relation(fields: [candidateId], references: [id], onDelete: Cascade)
  candidateId Int
  resume      Resume   @relation(fields: [resumeId], references: [id])
  resumeId    Int      @unique
  status      String
  evaluation  Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Resume {
  id          Int          @id @default(autoincrement())
  candidate   User         @relation(fields: [candidateId], references: [id] , onDelete: Cascade)
  candidateId Int
  filename    String
  application Application?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        TokenType
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      Int
}

enum Role {
  CANDIDATE
  RECRUITER
  ADMIN
}

enum TokenType {
  ACCESS
  REFRESH
  RESET_PASSWORD
  VERIFY_EMAIL
}


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\app.ts

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config';
import morgan from './config/morgan';
import xss from './middlewares/xss';
import { jwtStrategy } from './config/passport';
import { authLimiter } from './middlewares/rateLimiter';
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\client.ts

import { PrismaClient } from '@prisma/client';
import config from './config/config';

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (config.env === 'development') global.prisma = prisma;

export default prisma;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\index.ts

import { Server } from 'http';
import app from './app';
import prisma from './client';
import config from './config/config';
import logger from './config/logger';

let server: Server;
prisma.$connect().then(() => {
  logger.info('Connected to SQL Database');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\config\config.ts

import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\config\logger.ts

import winston from 'winston';
import config from './config';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

export default logger;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\config\morgan.ts

import { Response } from 'express';
import morgan from 'morgan';
import config from './config';
import logger from './logger';

morgan.token('message', (req, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
});

export default {
  successHandler,
  errorHandler
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\config\passport.ts

import prisma from '../client';
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';
import config from './config';
import { TokenType } from '@prisma/client';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== TokenType.ACCESS) {
      throw new Error('Invalid token type');
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        deletedAt: true
      },
      where: { id: payload.sub }
    });

    if (!user || user.deletedAt !== null) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\config\roles.ts

import { Role } from '@prisma/client';

const allRoles = {
  [Role.CANDIDATE]: ['getJobs', 'applyJob', 'getApplications', 'getApplication'],
  [Role.RECRUITER]: [
    'manageJobs',
    'getJobs',
    'reviewApplication',
    'getApplications',
    'getApplication',
    'getUsers'
  ],
  [Role.ADMIN]: ['getUsers', 'manageUsers']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\controllers\application.controller.ts

import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { applicationService } from '../services';

const applyJob = catchAsync(async (req, res) => {
  console.log('sssssssssssssssssssssssssssssssssssss\nsssssssssssssssssssssssssssss');
  console.log(req.file);
  console.log(req.resume);
  const application = await applicationService.applyJob(
    req.params.jobId,
    req.body,
    req.file,
    req.user
  );
  res.status(httpStatus.CREATED).send(application);
});

const getApplications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await applicationService.queryApplications(req.params.jobId, filter, options);
  res.send(result);
});

const getApplication = catchAsync(async (req, res) => {
  const application = await applicationService.getApplicationById(
    req.params.jobId,
    req.params.applicationId
  );
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  res.send(application);
});

const reviewApplication = catchAsync(async (req, res) => {
  const application = await applicationService.reviewApplication(
    req.params.jobId,
    req.params.applicationId,
    req.body
  );
  res.send(application);
});

export default {
  applyJob,
  getApplications,
  getApplication,
  reviewApplication
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\controllers\auth.controller.ts

import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';

const register = catchAsync(async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;
  const user = await userService.createUser(firstName, lastName, username, email, password, role);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt', 'deletedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const user = req.user as User;
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token as string);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\controllers\index.ts

export { default as authController } from './auth.controller';
export { default as userController } from './user.controller';
export { default as jobController } from './job.controller';
export { default as applicationController } from './application.controller';


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\controllers\job.controller.ts

import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { jobService } from '../services';
import { User } from '@prisma/client';

// Job controllers
const createJob = catchAsync(async (req, res) => {
  const job = await jobService.createJob(req.body, req.user);
  res.status(httpStatus.CREATED).send(job);
});

const getJobs = catchAsync(async (req, res) => {
  const user = req.user as User;
  const filter = pick(req.query, ['title', 'location', 'employmentType', 'isClosed']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await jobService.queryJobs(filter, user.role, options);
  res.send(result);
});

const getJob = catchAsync(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  res.send(job);
});

const updateJob = catchAsync(async (req, res) => {
  const job = await jobService.updateJobById(req.params.jobId, req.body, req.user);
  res.send(job);
});

export default {
  createJob,
  getJobs,
  getJob,
  updateJob
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\controllers\user.controller.ts

import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';
import { User } from '@prisma/client';

const createUser = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, username, role } = req.body;
  const user = await userService.createUser(firstName, lastName, email, password, username, role);
  res.status(httpStatus.CREATED).send(user);
});

const getCurrentUser = catchAsync(async (req, res) => {
  const currentUser = req.user as User;
  const user = await userService.getUserById(currentUser.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const updateCurrentUser = catchAsync(async (req, res) => {
  const currentUser = req.user as User;
  const user = await userService.updateUserById(currentUser.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteCurrentUser = catchAsync(async (req, res) => {
  const currentUser = req.user as User;

  await userService.deleteUserById(currentUser.id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateCurrentUser,
  deleteUser,
  deleteCurrentUser
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\docs\swaggerDef.ts

import { name, version, repository } from '../../package.json';
import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `${name} API documentation`,
    version,
    license: {
      name: 'MIT',
      url: repository
    }
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`
    }
  ]
};

export default swaggerDef;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\auth.ts

import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { roleRights } from '../config/roles';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const verifyCallback =
  (
    req: any,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    requiredRights: string[]
  ) =>
  async (err: unknown, user: User | false, info: unknown) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role) ?? [];

      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.params.userId !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\error.ts

import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import config from '../config/config';
import logger from '../config/logger';
import ApiError from '../utils/ApiError';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\rateLimiter.ts

import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
});


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\upload.ts

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const uploadsDir = 'uploads/';

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Set the maximum file size to 5MB
  }
});

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors
      console.error('Multer Error:', err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Handle other errors
      console.error('File Upload Error:', err);
      return res.status(400).json({ error: err.message });
    }

    // File uploaded successfully
    next();
  });
};

export default uploadMiddleware;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\validate.ts

import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import Joi from 'joi';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const obj = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\middlewares\xss.ts

import { NextFunction, Request, Response } from 'express';
import { inHTMLData } from 'xss-filters';

/**
 * Clean for xss.
 * @param {string/object} data - The value to sanitize
 * @return {string/object} The sanitized value
 */
export const clean = <T>(data: T | string = ''): T => {
  let isObject = false;
  if (typeof data === 'object') {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = inHTMLData(data as string).trim();
  if (isObject) data = JSON.parse(data);

  return data as T;
};

const middleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) req.body = clean(req.body);
    if (req.query) req.query = clean(req.query);
    if (req.params) req.params = clean(req.params);
    next();
  };
};

export default middleware;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\application.route.ts

import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { jobValidation } from '../../validations';
import { applicationController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .get(
    auth('getApplications'),
    validate(jobValidation.getApplications),
    applicationController.getApplications
  );

export default router;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\auth.route.ts

import express from 'express';
import validate from '../../middlewares/validate';
import authValidation from '../../validations/auth.validation';
import { authController } from '../../controllers';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

export default router;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\docs.route.ts

import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../../docs/swaggerDef';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts']
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true
  })
);

export default router;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\index.ts

import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import jobRoute from './job.route';
import applicationRoute from './application.route';
import docsRoute from './docs.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/jobs',
    route: jobRoute
  },
  {
    path: '/applications',
    route: applicationRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\job.route.ts

import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { jobValidation } from '../../validations';
import { jobController, applicationController } from '../../controllers';
import upload from '../../middlewares/upload';

const router = express.Router();

// Job routes
router
  .route('/')
  .post(auth('manageJobs'), validate(jobValidation.createJob), jobController.createJob)
  .get(auth('getJobs'), validate(jobValidation.getJobs), jobController.getJobs);

router
  .route('/:jobId')
  .get(auth('getJobs'), validate(jobValidation.getJob), jobController.getJob)
  .patch(auth('manageJobs'), validate(jobValidation.updateJob), jobController.updateJob);

// Application routes
router
  .route('/:jobId/applications')
  .post(auth('applyJob'), upload, validate(jobValidation.applyJob), applicationController.applyJob)
  .get(
    auth('getApplications'),
    validate(jobValidation.getApplications),
    applicationController.getApplications
  );

router
  .route('/:jobId/applications/:applicationId')
  .get(
    auth('getApplication'),
    validate(jobValidation.getApplication),
    applicationController.getApplication
  )
  .patch(
    auth('reviewApplication'),
    validate(jobValidation.reviewApplication),
    applicationController.reviewApplication
  );

export default router;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\routes\v1\user.route.ts

import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { userValidation } from '../../validations';
import { userController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router.get('/me', auth(), userController.getCurrentUser);

router.patch('/me', auth(), userController.updateCurrentUser);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser);

router.delete('/me', auth(), userController.deleteCurrentUser);
export default router;



### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\application.service.ts

import { Application } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import jobService from './job.service';
import { uploadFile } from '../utils/fileUpload';
import { ApplicationWithCandidate } from '../types/response';

const applyJob = async (
  jobId: number,
  applicationBody: any,
  file: any,
  currentUser: any
): Promise<Application> => {
  const job = await jobService.getJobById(jobId, ['id', 'isClosed', 'deadline']);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  if (job.deadline < new Date() || job.isClosed) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This job application is closed');
  }
  let resumeFilePath = 'upload';
  try {
    resumeFilePath = await uploadFile(file);
  } catch (err) {
    console.log(err);
  }
  const resume = await prisma.resume.create({
    data: {
      candidateId: currentUser.id,
      filename: resumeFilePath
    }
  });

  return prisma.application.create({
    data: {
      ...applicationBody,
      jobId: job.id,
      candidateId: currentUser.id,
      resumeId: resume.id,
      status: 'pending'
    }
  });
};

const queryApplications = async <Key extends keyof Application>(
  jobId: number,
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'status', 'createdAt', 'updatedAt'] as Key[]
): Promise<ApplicationWithCandidate<Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';

  if (jobId) {
    filter = {
      ...filter,
      jobId
    };
  }
  const applications = await prisma.application.findMany({
    where: {
      ...filter
    },
    select: {
      ...keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      candidate: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });

  return applications.map((application) => ({
    ...application,
    candidate: {
      id: application.candidate.id,
      firstName: application.candidate.firstName,
      lastName: application.candidate.lastName,
      email: application.candidate.email
    }
  })) as ApplicationWithCandidate<Key>[];
};
const getApplicationById = async <Key extends keyof Application>(
  jobId: number,
  applicationId: number,
  keys: Key[] = ['id', 'candidateId', 'status', 'createdAt', 'updatedAt'] as Key[]
): Promise<ApplicationWithCandidate<Key> | null> => {
  const job = await prisma.job.findFirst({
    where: { id: jobId },
    select: {
      id: true,
      title: true
    }
  });

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }

  const application = await prisma.application.findFirst({
    where: { id: applicationId, jobId },
    select: {
      ...keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      candidate: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  });

  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }

  return {
    ...application,
    candidate: {
      id: application?.candidate.id,
      firstName: application?.candidate.firstName,
      lastName: application?.candidate.lastName,
      email: application?.candidate.email
    }
  } as ApplicationWithCandidate<Key>;
};

const reviewApplication = async <Key extends keyof Application>(
  jobId: number,
  applicationId: number,
  updateBody: any,
  keys: Key[] = ['id', 'status', 'evaluation', 'updatedAt'] as Key[]
): Promise<Pick<Application, Key> | null> => {
  const application = await getApplicationById(jobId, applicationId, ['id']);
  if (!application) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Application not found');
  }
  const updatedApplication = await prisma.application.update({
    where: { id: applicationId },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedApplication as Pick<Application, Key> | null;
};

export default {
  applyJob,
  queryApplications,
  getApplicationById,
  reviewApplication
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\auth.service.ts

import httpStatus from 'http-status';
import tokenService from './token.service';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { TokenType, User } from '@prisma/client';
import prisma from '../client';
import { encryptPassword, isPasswordMatch } from '../utils/encryption';
import { AuthTokensResponse } from '../types/response';
import exclude from '../utils/exclude';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, 'password'>> => {
  const user = await userService.getUserByEmail(email, [
    'id',
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ]);
  if (!user || user.deletedAt || !(await isPasswordMatch(password, user.password as string))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return exclude(user, ['password']);
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenData = await prisma.token.findFirst({
    where: {
      token: refreshToken,
      type: TokenType.REFRESH,
      blacklisted: false
    }
  });
  if (!refreshTokenData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await prisma.token.delete({ where: { id: refreshTokenData.id } });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
  try {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
    const { userId } = refreshTokenData;
    await prisma.token.delete({ where: { id: refreshTokenData.id } });
    return tokenService.generateAuthTokens({ id: userId });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
const resetPassword = async (resetPasswordToken: string, newPassword: string): Promise<void> => {
  try {
    const resetPasswordTokenData = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenData.userId);
    if (!user) {
      throw new Error();
    }
    const encryptedPassword = await encryptPassword(newPassword);
    await userService.updateUserById(user.id, { password: encryptedPassword });
    await prisma.token.deleteMany({ where: { userId: user.id, type: TokenType.RESET_PASSWORD } });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<void>}
 */
const verifyEmail = async (verifyEmailToken: string): Promise<void> => {
  try {
    const verifyEmailTokenData = await tokenService.verifyToken(
      verifyEmailToken,
      TokenType.VERIFY_EMAIL
    );
    await prisma.token.deleteMany({
      where: { userId: verifyEmailTokenData.userId, type: TokenType.VERIFY_EMAIL }
    });
    await userService.updateUserById(verifyEmailTokenData.userId, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

export default {
  loginUserWithEmailAndPassword,
  isPasswordMatch,
  encryptPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\email.service.ts

import nodemailer from 'nodemailer';
import config from '../config/config';
import logger from '../config/logger';

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}`;
  await sendEmail(to, subject, text);
};

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\index.ts

export { default as authService } from './auth.service';
export { default as userService } from './user.service';
export { default as tokenService } from './token.service';
export { default as emailService } from './email.service';
export { default as jobService } from './job.service';
export { default as applicationService } from './application.service';


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\job.service.ts

import { Job, Role } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

// Job service
const createJob = async (jobBody: any, currentUser: any): Promise<Job> => {
  return prisma.job.create({
    data: {
      ...jobBody,
      recruiterId: currentUser.id
    }
  });
};

const queryJobs = async <Key extends keyof Job>(
  filter: object,
  userRole: Role,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'title',
    'description',
    'location',
    'employmentType',
    'isClosed',
    'deadline',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Job, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  if (userRole === Role.CANDIDATE) {
    filter = {
      ...filter,
      isClosed: false,
      deadline: {
        gt: new Date() // Filter for jobs with deadline greater than current date
      }
    };
  }
  const jobs = await prisma.job.findMany({
    where: {
      ...filter
    },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return jobs as Pick<Job, Key>[];
};

const getJobById = async <Key extends keyof Job>(
  id: number,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'location',
    'employmentType',
    'deadline',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Job, Key> | null> => {
  return prisma.job.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Job, Key> | null>;
};

const updateJobById = async <Key extends keyof Job>(
  jobId: number,
  updateBody: any,
  currentUser: any,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'location',
    'isClosed',
    'employmentType',
    'deadline',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Job, Key> | null> => {
  const job = await getJobById(jobId, ['id', 'recruiterId']);
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  if (job.recruiterId !== currentUser.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to update this job');
  }
  const updatedJob = await prisma.job.update({
    where: { id: job.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedJob as Pick<Job, Key> | null;
};

export default {
  createJob,
  queryJobs,
  getJobById,
  updateJobById
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\token.service.ts

import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import config from '../config/config';
import userService from './user.service';
import ApiError from '../utils/ApiError';
import { Token, TokenType } from '@prisma/client';
import prisma from '../client';
import { AuthTokensResponse } from '../types/response';

/**
 * Generate token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (
  userId: number,
  expires: Moment,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {number} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: Moment,
  type: TokenType,
  blacklisted = false
): Promise<Token> => {
  const createdToken = prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted
    }
  });
  return createdToken;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const userId = Number(payload.sub);
  const tokenData = await prisma.token.findFirst({
    where: { token, type, userId, blacklisted: false }
  });
  if (!tokenData) {
    throw new Error('Token not found');
  }
  return tokenData;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<AuthTokensResponse>}
 */
const generateAuthTokens = async (user: { id: number }): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email: string): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
  const resetPasswordToken = generateToken(user.id as number, expires, TokenType.RESET_PASSWORD);
  await saveToken(resetPasswordToken, user.id as number, expires, TokenType.RESET_PASSWORD);
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user: { id: number }): Promise<string> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, TokenType.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, TokenType.VERIFY_EMAIL);
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\services\user.service.ts

import { User, Role, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import { encryptPassword } from '../utils/encryption';

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  role: Role
): Promise<User> => {
  if ((await getUserByUsername(username)) || (await getUserByEmail(email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or Username already taken');
  }
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,

      password: await encryptPassword(password),
      role
    }
  });
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async <Key extends keyof User>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt',
    'deletedAt'
  ] as Key[]
): Promise<Pick<User, Key>[]> => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const users = await prisma.user.findMany({
    where: { ...filter, deletedAt: null },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return users as Pick<User, Key>[];
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async <Key extends keyof User>(
  id: number,
  keys: Key[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Get user by  username
 
 * * @param {string} username
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByUsername = async <Key extends keyof User>(
  username: string,
  keys: Key[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'username',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { username },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<User, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async <Key extends keyof User>(
  userId: number,
  updateBody: Prisma.UserUpdateInput,
  keys: Key[] = ['id', 'firstName', 'lastName', 'email', 'username', 'role'] as Key[]
): Promise<Pick<User, Key> | null> => {
  const user = await getUserById(userId, ['id', 'email', 'username']);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await getUserByEmail(updateBody.email as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.username && (await getUserByUsername(updateBody.username as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedUser as Pick<User, Key> | null;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: number): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await prisma.user.delete({ where: { id: user.id } });

  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUserById,
  deleteUserById
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\types\response.d.ts

export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export interface ApplicationWithCandidate<Key extends keyof Application>
  extends Pick<Application, Key> {
  candidate: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
}


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\ApiError.ts

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string | undefined, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\catchAsync.ts

import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express-serve-static-core';

export interface CustomParamsDictionary {
  [key: string]: any;
}

const catchAsync =
  (fn: RequestHandler<CustomParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>) =>
  (
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\encryption.ts

import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 8);
  return encryptedPassword;
};

export const isPasswordMatch = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword);
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\exclude.ts

/**
 * Exclude keys from object
 * @param obj
 * @param keys
 * @returns
 */
const exclude = <Type, Key extends keyof Type>(obj: Type, keys: Key[]): Omit<Type, Key> => {
  for (const key of keys) {
    delete obj[key];
  }
  return obj;
};

export default exclude;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\fileUpload.ts

import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

const uploadsDir = 'uploads/';

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const uploadFile = async (file: any): Promise<string> => {
  try {
    console.log('ffffffffffffffffffffffffffffffff', file.originalname);
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
    console.log('fillllllllllle paaaaaaaaaaaaaath', filePath);

    console.log(file.buffer);
    await fsPromises.writeFile(filePath, file.buffer);
    return filePath;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw err;
  }
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\utils\pick.ts

const pick = (obj: object, keys: string[]) => {
  return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key as keyof typeof obj];
    }
    return finalObj;
  }, {});
};

export default pick;


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\validations\auth.validation.ts

import Joi from 'joi';
import { password } from './custom.validation';
import { Role } from '@prisma/client';

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid(Role.CANDIDATE, Role.RECRUITER)
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required()
  })
};

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\validations\custom.validation.ts

import Joi from 'joi';

export const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8) {
    return helpers.error('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error('password must contain at least 1 letter and 1 number');
  }
  return value;
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\validations\index.ts

export { default as authValidation } from './auth.validation';
export { default as userValidation } from './user.validation';
export { default as jobValidation } from './job.validation';


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\validations\job.validation.ts

import Joi from 'joi';

const createJob = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    employmentType: Joi.string()
      .valid('full-time', 'part-time', 'contract', 'internship')
      .required(),
    deadline: Joi.date().greater(new Date()).required()
  })
};

const getJobs = {
  query: Joi.object().keys({
    title: Joi.string(),
    location: Joi.string(),
    employmentType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship'),
    sortBy: Joi.string(),
    isClosed: Joi.boolean(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getJob = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required()
  })
};

const updateJob = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required()
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    location: Joi.string(),
    employmentType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship'),
    isClosed: Joi.boolean(),
    deadline: Joi.date().greater(new Date())
  })
};

const deleteJob = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required()
  })
};

const applyJob = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required()
  }),
  body: Joi.object().keys({
    coverletter: Joi.string()
  })
};

const getApplications = {
  query: Joi.object().keys({
    status: Joi.string().valid('pending', 'accepted', 'rejected'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getApplication = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required(),
    applicationId: Joi.number().integer().required()
  })
};

const reviewApplication = {
  params: Joi.object().keys({
    jobId: Joi.number().integer().required(),
    applicationId: Joi.number().integer().required()
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
    evaluation: Joi.number()
  })
};

export default {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyJob,
  getApplications,
  getApplication,
  reviewApplication
};


### C:\Users\Utilisateur\Desktop\Projects\nodejs-hr\prisma-express-typescript-boilerplate\src\validations\user.validation.ts

import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.CANDIDATE, Role.RECRUITER, Role.ADMIN)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().custom(password),
      firstName: Joi.string(),
      lastName: Joi.string()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};


