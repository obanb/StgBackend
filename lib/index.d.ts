export declare type Maybe<T> = T | null;
export interface RegisterAccountInput {
    /** email */
    email: string;
    /** name */
    name: string;
    /** surname */
    surname: string;
    /** password */
    password: string;
    /** passwordRetry */
    passwordRetry: string;
    /** group with access level for account pairs */
    groups: GroupsInput;
}
export interface GroupsInput {
    group: string;
    accessPolicy: GroupAccessLevelEnum;
}
export interface ActivateAccountsInput {
    accountIds: string[];
}
export interface DeactivateAccountsInput {
    accountIds: string[];
}
export interface SendSystemMessageInput {
    systemMessage: string;
    accountIds: string[];
}
export interface CreateGroupInput {
    /** group name */
    name: string;
    /** short group description */
    descriptionShort: string;
    /** long group description */
    descriptionLong?: Maybe<string>;
    /** logo file ID */
    logo?: Maybe<string>;
    /** type of group */
    groupType: GroupTypeEnum;
    /** is entity with error? */
    error: boolean;
    /** error messages as array of string */
    errorMessages?: Maybe<string[]>;
    /** entity public policy */
    publicPolicy: PublicPolicyEnum;
    /** group alliances with another groups */
    groupAlliances?: Maybe<GroupAllianceInput[]>;
}
export interface GroupAllianceInput {
    group: string;
    alliancePolicy: AlliancePolicyEnum;
}
export declare enum PublicPolicyEnum {
    CLOSED = "closed",
    OPENED = "opened",
    BYGROUP = "byGroup"
}
export declare enum AccessLevelEnum {
    GUEST = "guest",
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner"
}
export declare enum SystemStatusEnum {
    ACTIVE = "active",
    INACTIVE = "inactive",
    WAITING = "waiting"
}
export declare enum GroupTypeEnum {
    COMMON = "common",
    PREMIUM = "premium"
}
export declare enum AlliancePolicyEnum {
    VIEW = "view",
    EDIT = "edit",
    EQUAL = "equal"
}
export declare enum GroupAccessLevelEnum {
    GUEST = "guest",
    FRIEND = "friend",
    MEMBER = "member",
    ADMIN = "admin",
    OWNER = "owner"
}
export declare enum PortalErrorType {
    ERROR = "Error",
    WARNING = "Warning"
}
/** Datum a čas ve formátu UTC. */
export declare type ScalarDateLong = any;
export interface Node {
    id: string;
}
export interface Query {
    account: AccountQuery;
    group: GroupQuery;
}
export interface AccountQuery {
    /** Account list */
    list: AccountListResult;
}
export interface AccountListResult {
    result?: Maybe<Account[]>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface Account extends Node {
    /** account ID */
    id: string;
    /** email */
    email: string;
    /** name */
    name: string;
    /** surname */
    surname: string;
    /** password */
    password: string;
    /** passwordRetry */
    passwordRetry: string;
    /** salt */
    salt: string;
    /** is entity with error? */
    error: boolean;
    /** error messages as array of string */
    errorMessages?: Maybe<string[]>;
    /** date of creation */
    createdAt: ScalarDateLong;
    /** date of last update */
    lastUpdate: ScalarDateLong;
    /** entity public policy */
    publicPolicy: PublicPolicyEnum;
    /** entity access level */
    accessLevel: AccessLevelEnum;
    /** entity system messages */
    systemMessages?: Maybe<string[]>;
    /** entity system status */
    systemStatus: SystemStatusEnum;
    /** group with access level for account pairs */
    groups?: Maybe<Groups[]>;
}
export interface Groups {
    group: Group;
    accessPolicy: GroupAccessLevelEnum;
}
export interface Group extends Node {
    /** group ID */
    id: string;
    /** group name */
    name: string;
    /** short group description */
    descriptionShort: string;
    /** long group description */
    descriptionLong?: Maybe<string>;
    /** logo file ID */
    logo?: Maybe<string>;
    /** type of group */
    groupType: GroupTypeEnum;
    /** is entity with error? */
    error: boolean;
    /** error messages as array of string */
    errorMessages?: Maybe<string[]>;
    /** date of creation */
    createdAt: ScalarDateLong;
    /** date of last update */
    lastUpdate: ScalarDateLong;
    /** entity public policy */
    publicPolicy: PublicPolicyEnum;
    /** entity access level */
    accessLevel: AccessLevelEnum;
    /** entity system messages */
    systemMessages?: Maybe<string[]>;
    /** entity system status */
    systemStatus: SystemStatusEnum;
    /** group alliances with another groups */
    groupAlliances?: Maybe<GroupAlliance[]>;
}
export interface GroupAlliance {
    group: Group;
    alliancePolicy: AlliancePolicyEnum;
}
export interface PortalError {
    message: string;
    code?: Maybe<string>;
    type: PortalErrorType;
    body?: Maybe<string>;
}
export interface GroupQuery {
    /** Group list */
    list: GroupListResult;
}
export interface GroupListResult {
    result?: Maybe<Group[]>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface Mutation {
    account: AccountMutation;
    group: GroupMutation;
}
export interface AccountMutation {
    /** Register account */
    register: RegisterAccountResult;
    /** Activate account */
    activate: ActivateAccountsResult;
    /** Deactivate account */
    deactivate: DeactivateccountsResult;
    /** Send system message tu multiple accounts */
    sendSystemMessage: SendSystemMessageResult;
}
export interface RegisterAccountResult {
    result?: Maybe<Account>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface ActivateAccountsResult {
    result?: Maybe<(Maybe<Account>)[]>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface DeactivateccountsResult {
    result?: Maybe<(Maybe<Account>)[]>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface SendSystemMessageResult {
    result?: Maybe<(Maybe<Account>)[]>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface GroupMutation {
    /** Create group */
    create: CreateGroupResult;
}
export interface CreateGroupResult {
    result?: Maybe<Group>;
    errors?: Maybe<(Maybe<PortalError>)[]>;
}
export interface RegisterAccountMutationArgs {
    input: RegisterAccountInput;
}
export interface ActivateAccountMutationArgs {
    input: ActivateAccountsInput;
}
export interface DeactivateAccountMutationArgs {
    input: DeactivateAccountsInput;
}
export interface SendSystemMessageAccountMutationArgs {
    input: SendSystemMessageInput;
}
export interface CreateGroupMutationArgs {
    input: CreateGroupInput;
}
