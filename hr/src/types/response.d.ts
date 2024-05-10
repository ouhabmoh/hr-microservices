
export interface ApplicationWithCandidate<Key extends keyof Application>
  extends Pick<Application, Key> {
  candidate: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
}
