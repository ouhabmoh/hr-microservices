
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  role: Role
  isEmailVerified: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

/**
 * Model Job
 * 
 */
export type Job = {
  id: number
  title: string
  description: string
  location: string
  employmentType: string
  deadline: Date
  isClosed: boolean
  createdAt: Date
  updatedAt: Date
  recruiterId: number
}

/**
 * Model Application
 * 
 */
export type Application = {
  id: number
  jobId: number
  candidateId: number
  resumeId: number
  status: string
  evaluation: number | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Resume
 * 
 */
export type Resume = {
  id: number
  candidateId: number
  filename: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Token
 * 
 */
export type Token = {
  id: number
  token: string
  type: TokenType
  expires: Date
  blacklisted: boolean
  createdAt: Date
  userId: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Role: {
  CANDIDATE: 'CANDIDATE',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  ACCESS: 'ACCESS',
  REFRESH: 'REFRESH',
  RESET_PASSWORD: 'RESET_PASSWORD',
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<GlobalReject>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<GlobalReject>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<GlobalReject>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.7.1
   * Query Engine version: 4bc8b6e1b66cb932731fb1bdbbc550d1e010de81
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Job: 'Job',
    Application: 'Application',
    Resume: 'Resume',
    Token: 'Token'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    Token: number
    resumes: number
    jobs: number
    Application: number
  }

  export type UserCountOutputTypeSelect = {
    Token?: boolean | UserCountOutputTypeCountTokenArgs
    resumes?: boolean | UserCountOutputTypeCountResumesArgs
    jobs?: boolean | UserCountOutputTypeCountJobsArgs
    Application?: boolean | UserCountOutputTypeCountApplicationArgs
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokenArgs = {
    where?: TokenWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResumesArgs = {
    where?: ResumeWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobsArgs = {
    where?: JobWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplicationArgs = {
    where?: ApplicationWhereInput
  }



  /**
   * Count Type JobCountOutputType
   */


  export type JobCountOutputType = {
    applications: number
  }

  export type JobCountOutputTypeSelect = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  export type JobCountOutputTypeGetPayload<S extends boolean | null | undefined | JobCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? JobCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (JobCountOutputTypeArgs)
    ? JobCountOutputType 
    : S extends { select: any } & (JobCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof JobCountOutputType ? JobCountOutputType[P] : never
  } 
      : JobCountOutputType




  // Custom InputTypes

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     * 
    **/
    select?: JobCountOutputTypeSelect | null
  }


  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs = {
    where?: ApplicationWhereInput
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
    password: string | null
    role: Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    username: string | null
    password: string | null
    role: Role | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    username: number
    password: number
    role: number
    isEmailVerified: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    username?: true
    password?: true
    role?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role: Role
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    Token?: boolean | TokenFindManyArgs
    resumes?: boolean | ResumeFindManyArgs
    jobs?: boolean | JobFindManyArgs
    Application?: boolean | ApplicationFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    Token?: boolean | TokenFindManyArgs
    resumes?: boolean | ResumeFindManyArgs
    jobs?: boolean | JobFindManyArgs
    Application?: boolean | ApplicationFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Token' ? Array < TokenGetPayload<S['include'][P]>>  :
        P extends 'resumes' ? Array < ResumeGetPayload<S['include'][P]>>  :
        P extends 'jobs' ? Array < JobGetPayload<S['include'][P]>>  :
        P extends 'Application' ? Array < ApplicationGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Token' ? Array < TokenGetPayload<S['select'][P]>>  :
        P extends 'resumes' ? Array < ResumeGetPayload<S['select'][P]>>  :
        P extends 'jobs' ? Array < JobGetPayload<S['select'][P]>>  :
        P extends 'Application' ? Array < ApplicationGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Token<T extends TokenFindManyArgs= {}>(args?: Subset<T, TokenFindManyArgs>): PrismaPromise<Array<TokenGetPayload<T>>| Null>;

    resumes<T extends ResumeFindManyArgs= {}>(args?: Subset<T, ResumeFindManyArgs>): PrismaPromise<Array<ResumeGetPayload<T>>| Null>;

    jobs<T extends JobFindManyArgs= {}>(args?: Subset<T, JobFindManyArgs>): PrismaPromise<Array<JobGetPayload<T>>| Null>;

    Application<T extends ApplicationFindManyArgs= {}>(args?: Subset<T, ApplicationFindManyArgs>): PrismaPromise<Array<ApplicationGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Job
   */


  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    id: number | null
    recruiterId: number | null
  }

  export type JobSumAggregateOutputType = {
    id: number | null
    recruiterId: number | null
  }

  export type JobMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    location: string | null
    employmentType: string | null
    deadline: Date | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    recruiterId: number | null
  }

  export type JobMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    location: string | null
    employmentType: string | null
    deadline: Date | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    recruiterId: number | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    description: number
    location: number
    employmentType: number
    deadline: number
    isClosed: number
    createdAt: number
    updatedAt: number
    recruiterId: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    id?: true
    recruiterId?: true
  }

  export type JobSumAggregateInputType = {
    id?: true
    recruiterId?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    employmentType?: true
    deadline?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
    recruiterId?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    employmentType?: true
    deadline?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
    recruiterId?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    employmentType?: true
    deadline?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
    recruiterId?: true
    _all?: true
  }

  export type JobAggregateArgs = {
    /**
     * Filter which Job to aggregate.
     * 
    **/
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs = {
    where?: JobWhereInput
    orderBy?: Enumerable<JobOrderByWithAggregationInput>
    by: Array<JobScalarFieldEnum>
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }


  export type JobGroupByOutputType = {
    id: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date
    isClosed: boolean
    createdAt: Date
    updatedAt: Date
    recruiterId: number
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = PrismaPromise<
    Array<
      PickArray<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect = {
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    employmentType?: boolean
    deadline?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recruiterId?: boolean
    recruiter?: boolean | UserArgs
    applications?: boolean | ApplicationFindManyArgs
    _count?: boolean | JobCountOutputTypeArgs
  }


  export type JobInclude = {
    recruiter?: boolean | UserArgs
    applications?: boolean | ApplicationFindManyArgs
    _count?: boolean | JobCountOutputTypeArgs
  } 

  export type JobGetPayload<S extends boolean | null | undefined | JobArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Job :
    S extends undefined ? never :
    S extends { include: any } & (JobArgs | JobFindManyArgs)
    ? Job  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'recruiter' ? UserGetPayload<S['include'][P]> :
        P extends 'applications' ? Array < ApplicationGetPayload<S['include'][P]>>  :
        P extends '_count' ? JobCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (JobArgs | JobFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'recruiter' ? UserGetPayload<S['select'][P]> :
        P extends 'applications' ? Array < ApplicationGetPayload<S['select'][P]>>  :
        P extends '_count' ? JobCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Job ? Job[P] : never
  } 
      : Job


  type JobCountArgs = Merge<
    Omit<JobFindManyArgs, 'select' | 'include'> & {
      select?: JobCountAggregateInputType | true
    }
  >

  export interface JobDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JobFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, JobFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Job'> extends True ? Prisma__JobClient<JobGetPayload<T>> : Prisma__JobClient<JobGetPayload<T> | null, null>

    /**
     * Find one Job that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, JobFindUniqueOrThrowArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JobFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, JobFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Job'> extends True ? Prisma__JobClient<JobGetPayload<T>> : Prisma__JobClient<JobGetPayload<T> | null, null>

    /**
     * Find the first Job that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(
      args?: SelectSubset<T, JobFindFirstOrThrowArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JobFindManyArgs>(
      args?: SelectSubset<T, JobFindManyArgs>
    ): PrismaPromise<Array<JobGetPayload<T>>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
    **/
    create<T extends JobCreateArgs>(
      args: SelectSubset<T, JobCreateArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Create many Jobs.
     *     @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     *     @example
     *     // Create many Jobs
     *     const job = await prisma.job.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends JobCreateManyArgs>(
      args?: SelectSubset<T, JobCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
    **/
    delete<T extends JobDeleteArgs>(
      args: SelectSubset<T, JobDeleteArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JobUpdateArgs>(
      args: SelectSubset<T, JobUpdateArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JobDeleteManyArgs>(
      args?: SelectSubset<T, JobDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JobUpdateManyArgs>(
      args: SelectSubset<T, JobUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
    **/
    upsert<T extends JobUpsertArgs>(
      args: SelectSubset<T, JobUpsertArgs>
    ): Prisma__JobClient<JobGetPayload<T>>

    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__JobClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    recruiter<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    applications<T extends ApplicationFindManyArgs= {}>(args?: Subset<T, ApplicationFindManyArgs>): PrismaPromise<Array<ApplicationGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Job base type for findUnique actions
   */
  export type JobFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter, which Job to fetch.
     * 
    **/
    where: JobWhereUniqueInput
  }

  /**
   * Job: findUnique
   */
  export interface JobFindUniqueArgs extends JobFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter, which Job to fetch.
     * 
    **/
    where: JobWhereUniqueInput
  }


  /**
   * Job base type for findFirst actions
   */
  export type JobFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter, which Job to fetch.
     * 
    **/
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     * 
    **/
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     * 
    **/
    distinct?: Enumerable<JobScalarFieldEnum>
  }

  /**
   * Job: findFirst
   */
  export interface JobFindFirstArgs extends JobFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter, which Job to fetch.
     * 
    **/
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     * 
    **/
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     * 
    **/
    distinct?: Enumerable<JobScalarFieldEnum>
  }


  /**
   * Job findMany
   */
  export type JobFindManyArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter, which Jobs to fetch.
     * 
    **/
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     * 
    **/
    orderBy?: Enumerable<JobOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     * 
    **/
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<JobScalarFieldEnum>
  }


  /**
   * Job create
   */
  export type JobCreateArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * The data needed to create a Job.
     * 
    **/
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }


  /**
   * Job createMany
   */
  export type JobCreateManyArgs = {
    /**
     * The data used to create many Jobs.
     * 
    **/
    data: Enumerable<JobCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Job update
   */
  export type JobUpdateArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * The data needed to update a Job.
     * 
    **/
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     * 
    **/
    where: JobWhereUniqueInput
  }


  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs = {
    /**
     * The data used to update Jobs.
     * 
    **/
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     * 
    **/
    where?: JobWhereInput
  }


  /**
   * Job upsert
   */
  export type JobUpsertArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * The filter to search for the Job to update in case it exists.
     * 
    **/
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     * 
    **/
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }


  /**
   * Job delete
   */
  export type JobDeleteArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
    /**
     * Filter which Job to delete.
     * 
    **/
    where: JobWhereUniqueInput
  }


  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs = {
    /**
     * Filter which Jobs to delete
     * 
    **/
    where?: JobWhereInput
  }


  /**
   * Job without action
   */
  export type JobArgs = {
    /**
     * Select specific fields to fetch from the Job
     * 
    **/
    select?: JobSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: JobInclude | null
  }



  /**
   * Model Application
   */


  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationAvgAggregateOutputType = {
    id: number | null
    jobId: number | null
    candidateId: number | null
    resumeId: number | null
    evaluation: number | null
  }

  export type ApplicationSumAggregateOutputType = {
    id: number | null
    jobId: number | null
    candidateId: number | null
    resumeId: number | null
    evaluation: number | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: number | null
    jobId: number | null
    candidateId: number | null
    resumeId: number | null
    status: string | null
    evaluation: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: number | null
    jobId: number | null
    candidateId: number | null
    resumeId: number | null
    status: string | null
    evaluation: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    jobId: number
    candidateId: number
    resumeId: number
    status: number
    evaluation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApplicationAvgAggregateInputType = {
    id?: true
    jobId?: true
    candidateId?: true
    resumeId?: true
    evaluation?: true
  }

  export type ApplicationSumAggregateInputType = {
    id?: true
    jobId?: true
    candidateId?: true
    resumeId?: true
    evaluation?: true
  }

  export type ApplicationMinAggregateInputType = {
    id?: true
    jobId?: true
    candidateId?: true
    resumeId?: true
    status?: true
    evaluation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    jobId?: true
    candidateId?: true
    resumeId?: true
    status?: true
    evaluation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    jobId?: true
    candidateId?: true
    resumeId?: true
    status?: true
    evaluation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApplicationAggregateArgs = {
    /**
     * Filter which Application to aggregate.
     * 
    **/
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     * 
    **/
    orderBy?: Enumerable<ApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs = {
    where?: ApplicationWhereInput
    orderBy?: Enumerable<ApplicationOrderByWithAggregationInput>
    by: Array<ApplicationScalarFieldEnum>
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _avg?: ApplicationAvgAggregateInputType
    _sum?: ApplicationSumAggregateInputType
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }


  export type ApplicationGroupByOutputType = {
    id: number
    jobId: number
    candidateId: number
    resumeId: number
    status: string
    evaluation: number | null
    createdAt: Date
    updatedAt: Date
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect = {
    id?: boolean
    jobId?: boolean
    candidateId?: boolean
    resumeId?: boolean
    status?: boolean
    evaluation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobArgs
    candidate?: boolean | UserArgs
    resume?: boolean | ResumeArgs
  }


  export type ApplicationInclude = {
    job?: boolean | JobArgs
    candidate?: boolean | UserArgs
    resume?: boolean | ResumeArgs
  } 

  export type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Application :
    S extends undefined ? never :
    S extends { include: any } & (ApplicationArgs | ApplicationFindManyArgs)
    ? Application  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'job' ? JobGetPayload<S['include'][P]> :
        P extends 'candidate' ? UserGetPayload<S['include'][P]> :
        P extends 'resume' ? ResumeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ApplicationArgs | ApplicationFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'job' ? JobGetPayload<S['select'][P]> :
        P extends 'candidate' ? UserGetPayload<S['select'][P]> :
        P extends 'resume' ? ResumeGetPayload<S['select'][P]> :  P extends keyof Application ? Application[P] : never
  } 
      : Application


  type ApplicationCountArgs = Merge<
    Omit<ApplicationFindManyArgs, 'select' | 'include'> & {
      select?: ApplicationCountAggregateInputType | true
    }
  >

  export interface ApplicationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ApplicationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ApplicationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Application'> extends True ? Prisma__ApplicationClient<ApplicationGetPayload<T>> : Prisma__ApplicationClient<ApplicationGetPayload<T> | null, null>

    /**
     * Find one Application that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ApplicationFindUniqueOrThrowArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ApplicationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ApplicationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Application'> extends True ? Prisma__ApplicationClient<ApplicationGetPayload<T>> : Prisma__ApplicationClient<ApplicationGetPayload<T> | null, null>

    /**
     * Find the first Application that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ApplicationFindManyArgs>(
      args?: SelectSubset<T, ApplicationFindManyArgs>
    ): PrismaPromise<Array<ApplicationGetPayload<T>>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
    **/
    create<T extends ApplicationCreateArgs>(
      args: SelectSubset<T, ApplicationCreateArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Create many Applications.
     *     @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     *     @example
     *     // Create many Applications
     *     const application = await prisma.application.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ApplicationCreateManyArgs>(
      args?: SelectSubset<T, ApplicationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
    **/
    delete<T extends ApplicationDeleteArgs>(
      args: SelectSubset<T, ApplicationDeleteArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ApplicationUpdateArgs>(
      args: SelectSubset<T, ApplicationUpdateArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ApplicationDeleteManyArgs>(
      args?: SelectSubset<T, ApplicationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ApplicationUpdateManyArgs>(
      args: SelectSubset<T, ApplicationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
    **/
    upsert<T extends ApplicationUpsertArgs>(
      args: SelectSubset<T, ApplicationUpsertArgs>
    ): Prisma__ApplicationClient<ApplicationGetPayload<T>>

    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ApplicationClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    job<T extends JobArgs= {}>(args?: Subset<T, JobArgs>): Prisma__JobClient<JobGetPayload<T> | Null>;

    candidate<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    resume<T extends ResumeArgs= {}>(args?: Subset<T, ResumeArgs>): Prisma__ResumeClient<ResumeGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Application base type for findUnique actions
   */
  export type ApplicationFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter, which Application to fetch.
     * 
    **/
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application: findUnique
   */
  export interface ApplicationFindUniqueArgs extends ApplicationFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter, which Application to fetch.
     * 
    **/
    where: ApplicationWhereUniqueInput
  }


  /**
   * Application base type for findFirst actions
   */
  export type ApplicationFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter, which Application to fetch.
     * 
    **/
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     * 
    **/
    orderBy?: Enumerable<ApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     * 
    **/
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     * 
    **/
    distinct?: Enumerable<ApplicationScalarFieldEnum>
  }

  /**
   * Application: findFirst
   */
  export interface ApplicationFindFirstArgs extends ApplicationFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter, which Application to fetch.
     * 
    **/
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     * 
    **/
    orderBy?: Enumerable<ApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     * 
    **/
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     * 
    **/
    distinct?: Enumerable<ApplicationScalarFieldEnum>
  }


  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter, which Applications to fetch.
     * 
    **/
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     * 
    **/
    orderBy?: Enumerable<ApplicationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     * 
    **/
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ApplicationScalarFieldEnum>
  }


  /**
   * Application create
   */
  export type ApplicationCreateArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * The data needed to create a Application.
     * 
    **/
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }


  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs = {
    /**
     * The data used to create many Applications.
     * 
    **/
    data: Enumerable<ApplicationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Application update
   */
  export type ApplicationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * The data needed to update a Application.
     * 
    **/
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     * 
    **/
    where: ApplicationWhereUniqueInput
  }


  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs = {
    /**
     * The data used to update Applications.
     * 
    **/
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     * 
    **/
    where?: ApplicationWhereInput
  }


  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * The filter to search for the Application to update in case it exists.
     * 
    **/
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     * 
    **/
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }


  /**
   * Application delete
   */
  export type ApplicationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
    /**
     * Filter which Application to delete.
     * 
    **/
    where: ApplicationWhereUniqueInput
  }


  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs = {
    /**
     * Filter which Applications to delete
     * 
    **/
    where?: ApplicationWhereInput
  }


  /**
   * Application without action
   */
  export type ApplicationArgs = {
    /**
     * Select specific fields to fetch from the Application
     * 
    **/
    select?: ApplicationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ApplicationInclude | null
  }



  /**
   * Model Resume
   */


  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    id: number | null
    candidateId: number | null
  }

  export type ResumeSumAggregateOutputType = {
    id: number | null
    candidateId: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: number | null
    candidateId: number | null
    filename: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: number | null
    candidateId: number | null
    filename: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    candidateId: number
    filename: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    id?: true
    candidateId?: true
  }

  export type ResumeSumAggregateInputType = {
    id?: true
    candidateId?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    candidateId?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    candidateId?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    candidateId?: true
    filename?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeAggregateArgs = {
    /**
     * Filter which Resume to aggregate.
     * 
    **/
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     * 
    **/
    orderBy?: Enumerable<ResumeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs = {
    where?: ResumeWhereInput
    orderBy?: Enumerable<ResumeOrderByWithAggregationInput>
    by: Array<ResumeScalarFieldEnum>
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }


  export type ResumeGroupByOutputType = {
    id: number
    candidateId: number
    filename: string
    createdAt: Date
    updatedAt: Date
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect = {
    id?: boolean
    candidateId?: boolean
    filename?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidate?: boolean | UserArgs
    application?: boolean | ApplicationArgs
  }


  export type ResumeInclude = {
    candidate?: boolean | UserArgs
    application?: boolean | ApplicationArgs
  } 

  export type ResumeGetPayload<S extends boolean | null | undefined | ResumeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Resume :
    S extends undefined ? never :
    S extends { include: any } & (ResumeArgs | ResumeFindManyArgs)
    ? Resume  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'candidate' ? UserGetPayload<S['include'][P]> :
        P extends 'application' ? ApplicationGetPayload<S['include'][P]> | null :  never
  } 
    : S extends { select: any } & (ResumeArgs | ResumeFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'candidate' ? UserGetPayload<S['select'][P]> :
        P extends 'application' ? ApplicationGetPayload<S['select'][P]> | null :  P extends keyof Resume ? Resume[P] : never
  } 
      : Resume


  type ResumeCountArgs = Merge<
    Omit<ResumeFindManyArgs, 'select' | 'include'> & {
      select?: ResumeCountAggregateInputType | true
    }
  >

  export interface ResumeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ResumeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ResumeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Resume'> extends True ? Prisma__ResumeClient<ResumeGetPayload<T>> : Prisma__ResumeClient<ResumeGetPayload<T> | null, null>

    /**
     * Find one Resume that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ResumeFindUniqueOrThrowArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ResumeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ResumeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Resume'> extends True ? Prisma__ResumeClient<ResumeGetPayload<T>> : Prisma__ResumeClient<ResumeGetPayload<T> | null, null>

    /**
     * Find the first Resume that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ResumeFindFirstOrThrowArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ResumeFindManyArgs>(
      args?: SelectSubset<T, ResumeFindManyArgs>
    ): PrismaPromise<Array<ResumeGetPayload<T>>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
    **/
    create<T extends ResumeCreateArgs>(
      args: SelectSubset<T, ResumeCreateArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Create many Resumes.
     *     @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     *     @example
     *     // Create many Resumes
     *     const resume = await prisma.resume.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ResumeCreateManyArgs>(
      args?: SelectSubset<T, ResumeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
    **/
    delete<T extends ResumeDeleteArgs>(
      args: SelectSubset<T, ResumeDeleteArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ResumeUpdateArgs>(
      args: SelectSubset<T, ResumeUpdateArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ResumeDeleteManyArgs>(
      args?: SelectSubset<T, ResumeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ResumeUpdateManyArgs>(
      args: SelectSubset<T, ResumeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
    **/
    upsert<T extends ResumeUpsertArgs>(
      args: SelectSubset<T, ResumeUpsertArgs>
    ): Prisma__ResumeClient<ResumeGetPayload<T>>

    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ResumeClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    candidate<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    application<T extends ApplicationArgs= {}>(args?: Subset<T, ApplicationArgs>): Prisma__ApplicationClient<ApplicationGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Resume base type for findUnique actions
   */
  export type ResumeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter, which Resume to fetch.
     * 
    **/
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume: findUnique
   */
  export interface ResumeFindUniqueArgs extends ResumeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter, which Resume to fetch.
     * 
    **/
    where: ResumeWhereUniqueInput
  }


  /**
   * Resume base type for findFirst actions
   */
  export type ResumeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter, which Resume to fetch.
     * 
    **/
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     * 
    **/
    orderBy?: Enumerable<ResumeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     * 
    **/
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     * 
    **/
    distinct?: Enumerable<ResumeScalarFieldEnum>
  }

  /**
   * Resume: findFirst
   */
  export interface ResumeFindFirstArgs extends ResumeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter, which Resume to fetch.
     * 
    **/
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     * 
    **/
    orderBy?: Enumerable<ResumeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     * 
    **/
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     * 
    **/
    distinct?: Enumerable<ResumeScalarFieldEnum>
  }


  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter, which Resumes to fetch.
     * 
    **/
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     * 
    **/
    orderBy?: Enumerable<ResumeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     * 
    **/
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ResumeScalarFieldEnum>
  }


  /**
   * Resume create
   */
  export type ResumeCreateArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * The data needed to create a Resume.
     * 
    **/
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }


  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs = {
    /**
     * The data used to create many Resumes.
     * 
    **/
    data: Enumerable<ResumeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Resume update
   */
  export type ResumeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * The data needed to update a Resume.
     * 
    **/
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     * 
    **/
    where: ResumeWhereUniqueInput
  }


  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs = {
    /**
     * The data used to update Resumes.
     * 
    **/
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     * 
    **/
    where?: ResumeWhereInput
  }


  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * The filter to search for the Resume to update in case it exists.
     * 
    **/
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     * 
    **/
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }


  /**
   * Resume delete
   */
  export type ResumeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
    /**
     * Filter which Resume to delete.
     * 
    **/
    where: ResumeWhereUniqueInput
  }


  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs = {
    /**
     * Filter which Resumes to delete
     * 
    **/
    where?: ResumeWhereInput
  }


  /**
   * Resume without action
   */
  export type ResumeArgs = {
    /**
     * Select specific fields to fetch from the Resume
     * 
    **/
    select?: ResumeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ResumeInclude | null
  }



  /**
   * Model Token
   */


  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    type: TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    type: TokenType | null
    expires: Date | null
    blacklisted: boolean | null
    createdAt: Date | null
    userId: number | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    token: number
    type: number
    expires: number
    blacklisted: number
    createdAt: number
    userId: number
    _all: number
  }


  export type TokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TokenMinAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    token?: true
    type?: true
    expires?: true
    blacklisted?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type TokenAggregateArgs = {
    /**
     * Filter which Token to aggregate.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs = {
    where?: TokenWhereInput
    orderBy?: Enumerable<TokenOrderByWithAggregationInput>
    by: Array<TokenScalarFieldEnum>
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _avg?: TokenAvgAggregateInputType
    _sum?: TokenSumAggregateInputType
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }


  export type TokenGroupByOutputType = {
    id: number
    token: string
    type: TokenType
    expires: Date
    blacklisted: boolean
    createdAt: Date
    userId: number
    _count: TokenCountAggregateOutputType | null
    _avg: TokenAvgAggregateOutputType | null
    _sum: TokenSumAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect = {
    id?: boolean
    token?: boolean
    type?: boolean
    expires?: boolean
    blacklisted?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserArgs
  }


  export type TokenInclude = {
    user?: boolean | UserArgs
  } 

  export type TokenGetPayload<S extends boolean | null | undefined | TokenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Token :
    S extends undefined ? never :
    S extends { include: any } & (TokenArgs | TokenFindManyArgs)
    ? Token  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TokenArgs | TokenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Token ? Token[P] : never
  } 
      : Token


  type TokenCountArgs = Merge<
    Omit<TokenFindManyArgs, 'select' | 'include'> & {
      select?: TokenCountAggregateInputType | true
    }
  >

  export interface TokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Token'> extends True ? Prisma__TokenClient<TokenGetPayload<T>> : Prisma__TokenClient<TokenGetPayload<T> | null, null>

    /**
     * Find one Token that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TokenFindUniqueOrThrowArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Token'> extends True ? Prisma__TokenClient<TokenGetPayload<T>> : Prisma__TokenClient<TokenGetPayload<T> | null, null>

    /**
     * Find the first Token that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TokenFindFirstOrThrowArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TokenFindManyArgs>(
      args?: SelectSubset<T, TokenFindManyArgs>
    ): PrismaPromise<Array<TokenGetPayload<T>>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
    **/
    create<T extends TokenCreateArgs>(
      args: SelectSubset<T, TokenCreateArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Create many Tokens.
     *     @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const token = await prisma.token.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TokenCreateManyArgs>(
      args?: SelectSubset<T, TokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
    **/
    delete<T extends TokenDeleteArgs>(
      args: SelectSubset<T, TokenDeleteArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TokenUpdateArgs>(
      args: SelectSubset<T, TokenUpdateArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TokenDeleteManyArgs>(
      args?: SelectSubset<T, TokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TokenUpdateManyArgs>(
      args: SelectSubset<T, TokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
    **/
    upsert<T extends TokenUpsertArgs>(
      args: SelectSubset<T, TokenUpsertArgs>
    ): Prisma__TokenClient<TokenGetPayload<T>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Token base type for findUnique actions
   */
  export type TokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where: TokenWhereUniqueInput
  }

  /**
   * Token: findUnique
   */
  export interface TokenFindUniqueArgs extends TokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token base type for findFirst actions
   */
  export type TokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokenScalarFieldEnum>
  }

  /**
   * Token: findFirst
   */
  export interface TokenFindFirstArgs extends TokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Token to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token findMany
   */
  export type TokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     * 
    **/
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TokenScalarFieldEnum>
  }


  /**
   * Token create
   */
  export type TokenCreateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to create a Token.
     * 
    **/
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }


  /**
   * Token createMany
   */
  export type TokenCreateManyArgs = {
    /**
     * The data used to create many Tokens.
     * 
    **/
    data: Enumerable<TokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Token update
   */
  export type TokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The data needed to update a Token.
     * 
    **/
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs = {
    /**
     * The data used to update Tokens.
     * 
    **/
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     * 
    **/
    where?: TokenWhereInput
  }


  /**
   * Token upsert
   */
  export type TokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * The filter to search for the Token to update in case it exists.
     * 
    **/
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     * 
    **/
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }


  /**
   * Token delete
   */
  export type TokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
    /**
     * Filter which Token to delete.
     * 
    **/
    where: TokenWhereUniqueInput
  }


  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs = {
    /**
     * Filter which Tokens to delete
     * 
    **/
    where?: TokenWhereInput
  }


  /**
   * Token without action
   */
  export type TokenArgs = {
    /**
     * Select specific fields to fetch from the Token
     * 
    **/
    select?: TokenSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TokenInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    username: 'username',
    password: 'password',
    role: 'role',
    isEmailVerified: 'isEmailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    location: 'location',
    employmentType: 'employmentType',
    deadline: 'deadline',
    isClosed: 'isClosed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    recruiterId: 'recruiterId'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    candidateId: 'candidateId',
    resumeId: 'resumeId',
    status: 'status',
    evaluation: 'evaluation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    candidateId: 'candidateId',
    filename: 'filename',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    type: 'type',
    expires: 'expires',
    blacklisted: 'blacklisted',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    firstName?: StringFilter | string
    lastName?: StringFilter | string
    email?: StringFilter | string
    username?: StringFilter | string
    password?: StringFilter | string
    role?: EnumRoleFilter | Role
    isEmailVerified?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    Token?: TokenListRelationFilter
    resumes?: ResumeListRelationFilter
    jobs?: JobListRelationFilter
    Application?: ApplicationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    Token?: TokenOrderByRelationAggregateInput
    resumes?: ResumeOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
    Application?: ApplicationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
    username?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    firstName?: StringWithAggregatesFilter | string
    lastName?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    role?: EnumRoleWithAggregatesFilter | Role
    isEmailVerified?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type JobWhereInput = {
    AND?: Enumerable<JobWhereInput>
    OR?: Enumerable<JobWhereInput>
    NOT?: Enumerable<JobWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    description?: StringFilter | string
    location?: StringFilter | string
    employmentType?: StringFilter | string
    deadline?: DateTimeFilter | Date | string
    isClosed?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    recruiterId?: IntFilter | number
    recruiter?: XOR<UserRelationFilter, UserWhereInput>
    applications?: ApplicationListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    deadline?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterId?: SortOrder
    recruiter?: UserOrderByWithRelationInput
    applications?: ApplicationOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = {
    id?: number
  }

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    deadline?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterId?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: Enumerable<JobScalarWhereWithAggregatesInput>
    OR?: Enumerable<JobScalarWhereWithAggregatesInput>
    NOT?: Enumerable<JobScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    location?: StringWithAggregatesFilter | string
    employmentType?: StringWithAggregatesFilter | string
    deadline?: DateTimeWithAggregatesFilter | Date | string
    isClosed?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    recruiterId?: IntWithAggregatesFilter | number
  }

  export type ApplicationWhereInput = {
    AND?: Enumerable<ApplicationWhereInput>
    OR?: Enumerable<ApplicationWhereInput>
    NOT?: Enumerable<ApplicationWhereInput>
    id?: IntFilter | number
    jobId?: IntFilter | number
    candidateId?: IntFilter | number
    resumeId?: IntFilter | number
    status?: StringFilter | string
    evaluation?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    job?: XOR<JobRelationFilter, JobWhereInput>
    candidate?: XOR<UserRelationFilter, UserWhereInput>
    resume?: XOR<ResumeRelationFilter, ResumeWhereInput>
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    evaluation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
    candidate?: UserOrderByWithRelationInput
    resume?: ResumeOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = {
    id?: number
    resumeId?: number
  }

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    evaluation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _avg?: ApplicationAvgOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
    _sum?: ApplicationSumOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ApplicationScalarWhereWithAggregatesInput>
    OR?: Enumerable<ApplicationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ApplicationScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    jobId?: IntWithAggregatesFilter | number
    candidateId?: IntWithAggregatesFilter | number
    resumeId?: IntWithAggregatesFilter | number
    status?: StringWithAggregatesFilter | string
    evaluation?: IntNullableWithAggregatesFilter | number | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ResumeWhereInput = {
    AND?: Enumerable<ResumeWhereInput>
    OR?: Enumerable<ResumeWhereInput>
    NOT?: Enumerable<ResumeWhereInput>
    id?: IntFilter | number
    candidateId?: IntFilter | number
    filename?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    candidate?: XOR<UserRelationFilter, UserWhereInput>
    application?: XOR<ApplicationRelationFilter, ApplicationWhereInput> | null
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    candidateId?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidate?: UserOrderByWithRelationInput
    application?: ApplicationOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = {
    id?: number
  }

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    candidateId?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ResumeScalarWhereWithAggregatesInput>
    OR?: Enumerable<ResumeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ResumeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    candidateId?: IntWithAggregatesFilter | number
    filename?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TokenWhereInput = {
    AND?: Enumerable<TokenWhereInput>
    OR?: Enumerable<TokenWhereInput>
    NOT?: Enumerable<TokenWhereInput>
    id?: IntFilter | number
    token?: StringFilter | string
    type?: EnumTokenTypeFilter | TokenType
    expires?: DateTimeFilter | Date | string
    blacklisted?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokenWhereUniqueInput = {
    id?: number
  }

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _avg?: TokenAvgOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
    _sum?: TokenSumOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<TokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TokenScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    token?: StringWithAggregatesFilter | string
    type?: EnumTokenTypeWithAggregatesFilter | TokenType
    expires?: DateTimeWithAggregatesFilter | Date | string
    blacklisted?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: IntWithAggregatesFilter | number
  }

  export type UserCreateInput = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutCandidateInput
    jobs?: JobCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutCandidateInput
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutCandidateNestedInput
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutCandidateNestedInput
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type JobCreateInput = {
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutJobsInput
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiterId: number
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiterId?: IntFieldUpdateOperationsInput | number
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiterId: number
  }

  export type JobUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiterId?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicationCreateInput = {
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    candidate: UserCreateNestedOneWithoutApplicationInput
    resume: ResumeCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: number
    jobId: number
    candidateId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    candidate?: UserUpdateOneRequiredWithoutApplicationNestedInput
    resume?: ResumeUpdateOneRequiredWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyInput = {
    id?: number
    jobId: number
    candidateId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeCreateInput = {
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: UserCreateNestedOneWithoutResumesInput
    application?: ApplicationCreateNestedOneWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: number
    candidateId: number
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
    application?: ApplicationUncheckedCreateNestedOneWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: UserUpdateOneRequiredWithoutResumesNestedInput
    application?: ApplicationUpdateOneWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUncheckedUpdateOneWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: number
    candidateId: number
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeUpdateManyMutationInput = {
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateInput = {
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: number
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TokenCreateManyInput = {
    id?: number
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
    userId: number
  }

  export type TokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type TokenListRelationFilter = {
    every?: TokenWhereInput
    some?: TokenWhereInput
    none?: TokenWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    deadline?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterId?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    id?: SortOrder
    recruiterId?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    deadline?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterId?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    employmentType?: SortOrder
    deadline?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recruiterId?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    id?: SortOrder
    recruiterId?: SortOrder
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type JobRelationFilter = {
    is?: JobWhereInput | null
    isNot?: JobWhereInput | null
  }

  export type ResumeRelationFilter = {
    is?: ResumeWhereInput | null
    isNot?: ResumeWhereInput | null
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    evaluation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationAvgOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    evaluation?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    evaluation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    evaluation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationSumOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    candidateId?: SortOrder
    resumeId?: SortOrder
    evaluation?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type ApplicationRelationFilter = {
    is?: ApplicationWhereInput | null
    isNot?: ApplicationWhereInput | null
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
    filename?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    id?: SortOrder
    candidateId?: SortOrder
  }

  export type EnumTokenTypeFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeFilter | TokenType
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires?: SortOrder
    blacklisted?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type TokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeWithAggregatesFilter | TokenType
    _count?: NestedIntFilter
    _min?: NestedEnumTokenTypeFilter
    _max?: NestedEnumTokenTypeFilter
  }

  export type TokenCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type ResumeCreateNestedManyWithoutCandidateInput = {
    create?: XOR<Enumerable<ResumeCreateWithoutCandidateInput>, Enumerable<ResumeUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ResumeCreateOrConnectWithoutCandidateInput>
    createMany?: ResumeCreateManyCandidateInputEnvelope
    connect?: Enumerable<ResumeWhereUniqueInput>
  }

  export type JobCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<Enumerable<JobCreateWithoutRecruiterInput>, Enumerable<JobUncheckedCreateWithoutRecruiterInput>>
    connectOrCreate?: Enumerable<JobCreateOrConnectWithoutRecruiterInput>
    createMany?: JobCreateManyRecruiterInputEnvelope
    connect?: Enumerable<JobWhereUniqueInput>
  }

  export type ApplicationCreateNestedManyWithoutCandidateInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutCandidateInput>, Enumerable<ApplicationUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutCandidateInput>
    createMany?: ApplicationCreateManyCandidateInputEnvelope
    connect?: Enumerable<ApplicationWhereUniqueInput>
  }

  export type TokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    connect?: Enumerable<TokenWhereUniqueInput>
  }

  export type ResumeUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<Enumerable<ResumeCreateWithoutCandidateInput>, Enumerable<ResumeUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ResumeCreateOrConnectWithoutCandidateInput>
    createMany?: ResumeCreateManyCandidateInputEnvelope
    connect?: Enumerable<ResumeWhereUniqueInput>
  }

  export type JobUncheckedCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<Enumerable<JobCreateWithoutRecruiterInput>, Enumerable<JobUncheckedCreateWithoutRecruiterInput>>
    connectOrCreate?: Enumerable<JobCreateOrConnectWithoutRecruiterInput>
    createMany?: JobCreateManyRecruiterInputEnvelope
    connect?: Enumerable<JobWhereUniqueInput>
  }

  export type ApplicationUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutCandidateInput>, Enumerable<ApplicationUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutCandidateInput>
    createMany?: ApplicationCreateManyCandidateInputEnvelope
    connect?: Enumerable<ApplicationWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type ResumeUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<Enumerable<ResumeCreateWithoutCandidateInput>, Enumerable<ResumeUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ResumeCreateOrConnectWithoutCandidateInput>
    upsert?: Enumerable<ResumeUpsertWithWhereUniqueWithoutCandidateInput>
    createMany?: ResumeCreateManyCandidateInputEnvelope
    set?: Enumerable<ResumeWhereUniqueInput>
    disconnect?: Enumerable<ResumeWhereUniqueInput>
    delete?: Enumerable<ResumeWhereUniqueInput>
    connect?: Enumerable<ResumeWhereUniqueInput>
    update?: Enumerable<ResumeUpdateWithWhereUniqueWithoutCandidateInput>
    updateMany?: Enumerable<ResumeUpdateManyWithWhereWithoutCandidateInput>
    deleteMany?: Enumerable<ResumeScalarWhereInput>
  }

  export type JobUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<Enumerable<JobCreateWithoutRecruiterInput>, Enumerable<JobUncheckedCreateWithoutRecruiterInput>>
    connectOrCreate?: Enumerable<JobCreateOrConnectWithoutRecruiterInput>
    upsert?: Enumerable<JobUpsertWithWhereUniqueWithoutRecruiterInput>
    createMany?: JobCreateManyRecruiterInputEnvelope
    set?: Enumerable<JobWhereUniqueInput>
    disconnect?: Enumerable<JobWhereUniqueInput>
    delete?: Enumerable<JobWhereUniqueInput>
    connect?: Enumerable<JobWhereUniqueInput>
    update?: Enumerable<JobUpdateWithWhereUniqueWithoutRecruiterInput>
    updateMany?: Enumerable<JobUpdateManyWithWhereWithoutRecruiterInput>
    deleteMany?: Enumerable<JobScalarWhereInput>
  }

  export type ApplicationUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutCandidateInput>, Enumerable<ApplicationUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutCandidateInput>
    upsert?: Enumerable<ApplicationUpsertWithWhereUniqueWithoutCandidateInput>
    createMany?: ApplicationCreateManyCandidateInputEnvelope
    set?: Enumerable<ApplicationWhereUniqueInput>
    disconnect?: Enumerable<ApplicationWhereUniqueInput>
    delete?: Enumerable<ApplicationWhereUniqueInput>
    connect?: Enumerable<ApplicationWhereUniqueInput>
    update?: Enumerable<ApplicationUpdateWithWhereUniqueWithoutCandidateInput>
    updateMany?: Enumerable<ApplicationUpdateManyWithWhereWithoutCandidateInput>
    deleteMany?: Enumerable<ApplicationScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<TokenCreateWithoutUserInput>, Enumerable<TokenUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<TokenCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<TokenUpsertWithWhereUniqueWithoutUserInput>
    createMany?: TokenCreateManyUserInputEnvelope
    set?: Enumerable<TokenWhereUniqueInput>
    disconnect?: Enumerable<TokenWhereUniqueInput>
    delete?: Enumerable<TokenWhereUniqueInput>
    connect?: Enumerable<TokenWhereUniqueInput>
    update?: Enumerable<TokenUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<TokenUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<TokenScalarWhereInput>
  }

  export type ResumeUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<Enumerable<ResumeCreateWithoutCandidateInput>, Enumerable<ResumeUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ResumeCreateOrConnectWithoutCandidateInput>
    upsert?: Enumerable<ResumeUpsertWithWhereUniqueWithoutCandidateInput>
    createMany?: ResumeCreateManyCandidateInputEnvelope
    set?: Enumerable<ResumeWhereUniqueInput>
    disconnect?: Enumerable<ResumeWhereUniqueInput>
    delete?: Enumerable<ResumeWhereUniqueInput>
    connect?: Enumerable<ResumeWhereUniqueInput>
    update?: Enumerable<ResumeUpdateWithWhereUniqueWithoutCandidateInput>
    updateMany?: Enumerable<ResumeUpdateManyWithWhereWithoutCandidateInput>
    deleteMany?: Enumerable<ResumeScalarWhereInput>
  }

  export type JobUncheckedUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<Enumerable<JobCreateWithoutRecruiterInput>, Enumerable<JobUncheckedCreateWithoutRecruiterInput>>
    connectOrCreate?: Enumerable<JobCreateOrConnectWithoutRecruiterInput>
    upsert?: Enumerable<JobUpsertWithWhereUniqueWithoutRecruiterInput>
    createMany?: JobCreateManyRecruiterInputEnvelope
    set?: Enumerable<JobWhereUniqueInput>
    disconnect?: Enumerable<JobWhereUniqueInput>
    delete?: Enumerable<JobWhereUniqueInput>
    connect?: Enumerable<JobWhereUniqueInput>
    update?: Enumerable<JobUpdateWithWhereUniqueWithoutRecruiterInput>
    updateMany?: Enumerable<JobUpdateManyWithWhereWithoutRecruiterInput>
    deleteMany?: Enumerable<JobScalarWhereInput>
  }

  export type ApplicationUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutCandidateInput>, Enumerable<ApplicationUncheckedCreateWithoutCandidateInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutCandidateInput>
    upsert?: Enumerable<ApplicationUpsertWithWhereUniqueWithoutCandidateInput>
    createMany?: ApplicationCreateManyCandidateInputEnvelope
    set?: Enumerable<ApplicationWhereUniqueInput>
    disconnect?: Enumerable<ApplicationWhereUniqueInput>
    delete?: Enumerable<ApplicationWhereUniqueInput>
    connect?: Enumerable<ApplicationWhereUniqueInput>
    update?: Enumerable<ApplicationUpdateWithWhereUniqueWithoutCandidateInput>
    updateMany?: Enumerable<ApplicationUpdateManyWithWhereWithoutCandidateInput>
    deleteMany?: Enumerable<ApplicationScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutJobsInput = {
    create?: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutJobInput>, Enumerable<ApplicationUncheckedCreateWithoutJobInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutJobInput>
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: Enumerable<ApplicationWhereUniqueInput>
  }

  export type ApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutJobInput>, Enumerable<ApplicationUncheckedCreateWithoutJobInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutJobInput>
    createMany?: ApplicationCreateManyJobInputEnvelope
    connect?: Enumerable<ApplicationWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsInput
    upsert?: UserUpsertWithoutJobsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutJobsInput, UserUncheckedUpdateWithoutJobsInput>
  }

  export type ApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutJobInput>, Enumerable<ApplicationUncheckedCreateWithoutJobInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutJobInput>
    upsert?: Enumerable<ApplicationUpsertWithWhereUniqueWithoutJobInput>
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: Enumerable<ApplicationWhereUniqueInput>
    disconnect?: Enumerable<ApplicationWhereUniqueInput>
    delete?: Enumerable<ApplicationWhereUniqueInput>
    connect?: Enumerable<ApplicationWhereUniqueInput>
    update?: Enumerable<ApplicationUpdateWithWhereUniqueWithoutJobInput>
    updateMany?: Enumerable<ApplicationUpdateManyWithWhereWithoutJobInput>
    deleteMany?: Enumerable<ApplicationScalarWhereInput>
  }

  export type ApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<Enumerable<ApplicationCreateWithoutJobInput>, Enumerable<ApplicationUncheckedCreateWithoutJobInput>>
    connectOrCreate?: Enumerable<ApplicationCreateOrConnectWithoutJobInput>
    upsert?: Enumerable<ApplicationUpsertWithWhereUniqueWithoutJobInput>
    createMany?: ApplicationCreateManyJobInputEnvelope
    set?: Enumerable<ApplicationWhereUniqueInput>
    disconnect?: Enumerable<ApplicationWhereUniqueInput>
    delete?: Enumerable<ApplicationWhereUniqueInput>
    connect?: Enumerable<ApplicationWhereUniqueInput>
    update?: Enumerable<ApplicationUpdateWithWhereUniqueWithoutJobInput>
    updateMany?: Enumerable<ApplicationUpdateManyWithWhereWithoutJobInput>
    deleteMany?: Enumerable<ApplicationScalarWhereInput>
  }

  export type JobCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    connect?: JobWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApplicationInput = {
    create?: XOR<UserCreateWithoutApplicationInput, UserUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationInput
    connect?: UserWhereUniqueInput
  }

  export type ResumeCreateNestedOneWithoutApplicationInput = {
    create?: XOR<ResumeCreateWithoutApplicationInput, ResumeUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationInput
    connect?: ResumeWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    upsert?: JobUpsertWithoutApplicationsInput
    connect?: JobWhereUniqueInput
    update?: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateOneRequiredWithoutApplicationNestedInput = {
    create?: XOR<UserCreateWithoutApplicationInput, UserUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: UserCreateOrConnectWithoutApplicationInput
    upsert?: UserUpsertWithoutApplicationInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutApplicationInput, UserUncheckedUpdateWithoutApplicationInput>
  }

  export type ResumeUpdateOneRequiredWithoutApplicationNestedInput = {
    create?: XOR<ResumeCreateWithoutApplicationInput, ResumeUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationInput
    upsert?: ResumeUpsertWithoutApplicationInput
    connect?: ResumeWhereUniqueInput
    update?: XOR<ResumeUpdateWithoutApplicationInput, ResumeUncheckedUpdateWithoutApplicationInput>
  }

  export type UserCreateNestedOneWithoutResumesInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    connect?: UserWhereUniqueInput
  }

  export type ApplicationCreateNestedOneWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput
    connect?: ApplicationWhereUniqueInput
  }

  export type ApplicationUncheckedCreateNestedOneWithoutResumeInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput
    connect?: ApplicationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResumesInput
    upsert?: UserUpsertWithoutResumesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
  }

  export type ApplicationUpdateOneWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput
    upsert?: ApplicationUpsertWithoutResumeInput
    disconnect?: boolean
    delete?: boolean
    connect?: ApplicationWhereUniqueInput
    update?: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
  }

  export type ApplicationUncheckedUpdateOneWithoutResumeNestedInput = {
    create?: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutResumeInput
    upsert?: ApplicationUpsertWithoutResumeInput
    disconnect?: boolean
    delete?: boolean
    connect?: ApplicationWhereUniqueInput
    update?: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
  }

  export type UserCreateNestedOneWithoutTokenInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: TokenType
  }

  export type UserUpdateOneRequiredWithoutTokenNestedInput = {
    create?: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokenInput
    upsert?: UserUpsertWithoutTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedEnumTokenTypeFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeFilter | TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter = {
    equals?: TokenType
    in?: Enumerable<TokenType>
    notIn?: Enumerable<TokenType>
    not?: NestedEnumTokenTypeWithAggregatesFilter | TokenType
    _count?: NestedIntFilter
    _min?: NestedEnumTokenTypeFilter
    _max?: NestedEnumTokenTypeFilter
  }

  export type TokenCreateWithoutUserInput = {
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenCreateManyUserInputEnvelope = {
    data: Enumerable<TokenCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ResumeCreateWithoutCandidateInput = {
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
    application?: ApplicationCreateNestedOneWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutCandidateInput = {
    id?: number
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
    application?: ApplicationUncheckedCreateNestedOneWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutCandidateInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutCandidateInput, ResumeUncheckedCreateWithoutCandidateInput>
  }

  export type ResumeCreateManyCandidateInputEnvelope = {
    data: Enumerable<ResumeCreateManyCandidateInput>
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutRecruiterInput = {
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutRecruiterInput = {
    id?: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: ApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput>
  }

  export type JobCreateManyRecruiterInputEnvelope = {
    data: Enumerable<JobCreateManyRecruiterInput>
    skipDuplicates?: boolean
  }

  export type ApplicationCreateWithoutCandidateInput = {
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    resume: ResumeCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutCandidateInput = {
    id?: number
    jobId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutCandidateInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutCandidateInput, ApplicationUncheckedCreateWithoutCandidateInput>
  }

  export type ApplicationCreateManyCandidateInputEnvelope = {
    data: Enumerable<ApplicationCreateManyCandidateInput>
    skipDuplicates?: boolean
  }

  export type TokenUpsertWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TokenUpdateWithWhereUniqueWithoutUserInput = {
    where: TokenWhereUniqueInput
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TokenUpdateManyWithWhereWithoutUserInput = {
    where: TokenScalarWhereInput
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyWithoutTokenInput>
  }

  export type TokenScalarWhereInput = {
    AND?: Enumerable<TokenScalarWhereInput>
    OR?: Enumerable<TokenScalarWhereInput>
    NOT?: Enumerable<TokenScalarWhereInput>
    id?: IntFilter | number
    token?: StringFilter | string
    type?: EnumTokenTypeFilter | TokenType
    expires?: DateTimeFilter | Date | string
    blacklisted?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    userId?: IntFilter | number
  }

  export type ResumeUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutCandidateInput, ResumeUncheckedUpdateWithoutCandidateInput>
    create: XOR<ResumeCreateWithoutCandidateInput, ResumeUncheckedCreateWithoutCandidateInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutCandidateInput, ResumeUncheckedUpdateWithoutCandidateInput>
  }

  export type ResumeUpdateManyWithWhereWithoutCandidateInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutResumesInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: Enumerable<ResumeScalarWhereInput>
    OR?: Enumerable<ResumeScalarWhereInput>
    NOT?: Enumerable<ResumeScalarWhereInput>
    id?: IntFilter | number
    candidateId?: IntFilter | number
    filename?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutRecruiterInput, JobUncheckedUpdateWithoutRecruiterInput>
    create: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput>
  }

  export type JobUpdateWithWhereUniqueWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutRecruiterInput, JobUncheckedUpdateWithoutRecruiterInput>
  }

  export type JobUpdateManyWithWhereWithoutRecruiterInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutJobsInput>
  }

  export type JobScalarWhereInput = {
    AND?: Enumerable<JobScalarWhereInput>
    OR?: Enumerable<JobScalarWhereInput>
    NOT?: Enumerable<JobScalarWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    description?: StringFilter | string
    location?: StringFilter | string
    employmentType?: StringFilter | string
    deadline?: DateTimeFilter | Date | string
    isClosed?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    recruiterId?: IntFilter | number
  }

  export type ApplicationUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutCandidateInput, ApplicationUncheckedUpdateWithoutCandidateInput>
    create: XOR<ApplicationCreateWithoutCandidateInput, ApplicationUncheckedCreateWithoutCandidateInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutCandidateInput, ApplicationUncheckedUpdateWithoutCandidateInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutCandidateInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutApplicationInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: Enumerable<ApplicationScalarWhereInput>
    OR?: Enumerable<ApplicationScalarWhereInput>
    NOT?: Enumerable<ApplicationScalarWhereInput>
    id?: IntFilter | number
    jobId?: IntFilter | number
    candidateId?: IntFilter | number
    resumeId?: IntFilter | number
    status?: StringFilter | string
    evaluation?: IntNullableFilter | number | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserCreateWithoutJobsInput = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutCandidateInput
    Application?: ApplicationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutJobsInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutCandidateInput
    Application?: ApplicationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutJobsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationCreateWithoutJobInput = {
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: UserCreateNestedOneWithoutApplicationInput
    resume: ResumeCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutJobInput = {
    id?: number
    candidateId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationCreateManyJobInputEnvelope = {
    data: Enumerable<ApplicationCreateManyJobInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutJobsInput = {
    update: XOR<UserUpdateWithoutJobsInput, UserUncheckedUpdateWithoutJobsInput>
    create: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
  }

  export type UserUpdateWithoutJobsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutCandidateNestedInput
    Application?: ApplicationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutCandidateNestedInput
    Application?: ApplicationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type ApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<ApplicationCreateWithoutJobInput, ApplicationUncheckedCreateWithoutJobInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutJobInput, ApplicationUncheckedUpdateWithoutJobInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutJobInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutApplicationsInput>
  }

  export type JobCreateWithoutApplicationsInput = {
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiter: UserCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recruiterId: number
  }

  export type JobCreateOrConnectWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type UserCreateWithoutApplicationInput = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenCreateNestedManyWithoutUserInput
    resumes?: ResumeCreateNestedManyWithoutCandidateInput
    jobs?: JobCreateNestedManyWithoutRecruiterInput
  }

  export type UserUncheckedCreateWithoutApplicationInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutCandidateInput
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type UserCreateOrConnectWithoutApplicationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationInput, UserUncheckedCreateWithoutApplicationInput>
  }

  export type ResumeCreateWithoutApplicationInput = {
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidate: UserCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateWithoutApplicationInput = {
    id?: number
    candidateId: number
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeCreateOrConnectWithoutApplicationInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutApplicationInput, ResumeUncheckedCreateWithoutApplicationInput>
  }

  export type JobUpsertWithoutApplicationsInput = {
    update: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiter?: UserUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recruiterId?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutApplicationInput = {
    update: XOR<UserUpdateWithoutApplicationInput, UserUncheckedUpdateWithoutApplicationInput>
    create: XOR<UserCreateWithoutApplicationInput, UserUncheckedCreateWithoutApplicationInput>
  }

  export type UserUpdateWithoutApplicationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUpdateManyWithoutUserNestedInput
    resumes?: ResumeUpdateManyWithoutCandidateNestedInput
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutCandidateNestedInput
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type ResumeUpsertWithoutApplicationInput = {
    update: XOR<ResumeUpdateWithoutApplicationInput, ResumeUncheckedUpdateWithoutApplicationInput>
    create: XOR<ResumeCreateWithoutApplicationInput, ResumeUncheckedCreateWithoutApplicationInput>
  }

  export type ResumeUpdateWithoutApplicationInput = {
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: UserUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutResumesInput = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenCreateNestedManyWithoutUserInput
    jobs?: JobCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutResumesInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    Token?: TokenUncheckedCreateNestedManyWithoutUserInput
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutResumesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type ApplicationCreateWithoutResumeInput = {
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutApplicationsInput
    candidate: UserCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutResumeInput = {
    id?: number
    jobId: number
    candidateId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateOrConnectWithoutResumeInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type UserUpsertWithoutResumesInput = {
    update: XOR<UserUpdateWithoutResumesInput, UserUncheckedUpdateWithoutResumesInput>
    create: XOR<UserCreateWithoutResumesInput, UserUncheckedCreateWithoutResumesInput>
  }

  export type UserUpdateWithoutResumesInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUpdateManyWithoutUserNestedInput
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutResumesInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Token?: TokenUncheckedUpdateManyWithoutUserNestedInput
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type ApplicationUpsertWithoutResumeInput = {
    update: XOR<ApplicationUpdateWithoutResumeInput, ApplicationUncheckedUpdateWithoutResumeInput>
    create: XOR<ApplicationCreateWithoutResumeInput, ApplicationUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationUpdateWithoutResumeInput = {
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    candidate?: UserUpdateOneRequiredWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutResumeInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTokenInput = {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    resumes?: ResumeCreateNestedManyWithoutCandidateInput
    jobs?: JobCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationCreateNestedManyWithoutCandidateInput
  }

  export type UserUncheckedCreateWithoutTokenInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    role?: Role
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    resumes?: ResumeUncheckedCreateNestedManyWithoutCandidateInput
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
    Application?: ApplicationUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type UserCreateOrConnectWithoutTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpsertWithoutTokenInput = {
    update: XOR<UserUpdateWithoutTokenInput, UserUncheckedUpdateWithoutTokenInput>
    create: XOR<UserCreateWithoutTokenInput, UserUncheckedCreateWithoutTokenInput>
  }

  export type UserUpdateWithoutTokenInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resumes?: ResumeUpdateManyWithoutCandidateNestedInput
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUpdateManyWithoutCandidateNestedInput
  }

  export type UserUncheckedUpdateWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | Role
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resumes?: ResumeUncheckedUpdateManyWithoutCandidateNestedInput
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
    Application?: ApplicationUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type TokenCreateManyUserInput = {
    id?: number
    token: string
    type: TokenType
    expires: Date | string
    blacklisted: boolean
    createdAt?: Date | string
  }

  export type ResumeCreateManyCandidateInput = {
    id?: number
    filename: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateManyRecruiterInput = {
    id?: number
    title: string
    description: string
    location: string
    employmentType: string
    deadline: Date | string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationCreateManyCandidateInput = {
    id?: number
    jobId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyWithoutTokenInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | TokenType
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    blacklisted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeUpdateWithoutCandidateInput = {
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUpdateOneWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutCandidateInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: ApplicationUncheckedUpdateOneWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateManyWithoutResumesInput = {
    id?: IntFieldUpdateOperationsInput | number
    filename?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutRecruiterInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutRecruiterInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: ApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUpdateWithoutCandidateInput = {
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    resume?: ResumeUpdateOneRequiredWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutCandidateInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    jobId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationCreateManyJobInput = {
    id?: number
    candidateId: number
    resumeId: number
    status: string
    evaluation?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApplicationUpdateWithoutJobInput = {
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: UserUpdateOneRequiredWithoutApplicationNestedInput
    resume?: ResumeUpdateOneRequiredWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutJobInput = {
    id?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApplicationUncheckedUpdateManyWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    resumeId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    evaluation?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}