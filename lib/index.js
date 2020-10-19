"use strict";
exports.__esModule = true;
var PublicPolicyEnum;
(function (PublicPolicyEnum) {
    PublicPolicyEnum["CLOSED"] = "closed";
    PublicPolicyEnum["OPENED"] = "opened";
    PublicPolicyEnum["BYGROUP"] = "byGroup";
})(PublicPolicyEnum = exports.PublicPolicyEnum || (exports.PublicPolicyEnum = {}));
var AccessLevelEnum;
(function (AccessLevelEnum) {
    AccessLevelEnum["GUEST"] = "guest";
    AccessLevelEnum["USER"] = "user";
    AccessLevelEnum["ADMIN"] = "admin";
    AccessLevelEnum["OWNER"] = "owner";
})(AccessLevelEnum = exports.AccessLevelEnum || (exports.AccessLevelEnum = {}));
var SystemStatusEnum;
(function (SystemStatusEnum) {
    SystemStatusEnum["ACTIVE"] = "active";
    SystemStatusEnum["INACTIVE"] = "inactive";
    SystemStatusEnum["WAITING"] = "waiting";
})(SystemStatusEnum = exports.SystemStatusEnum || (exports.SystemStatusEnum = {}));
var GroupTypeEnum;
(function (GroupTypeEnum) {
    GroupTypeEnum["COMMON"] = "common";
    GroupTypeEnum["PREMIUM"] = "premium";
})(GroupTypeEnum = exports.GroupTypeEnum || (exports.GroupTypeEnum = {}));
var AlliancePolicyEnum;
(function (AlliancePolicyEnum) {
    AlliancePolicyEnum["VIEW"] = "view";
    AlliancePolicyEnum["EDIT"] = "edit";
    AlliancePolicyEnum["EQUAL"] = "equal";
})(AlliancePolicyEnum = exports.AlliancePolicyEnum || (exports.AlliancePolicyEnum = {}));
var GroupAccessLevelEnum;
(function (GroupAccessLevelEnum) {
    GroupAccessLevelEnum["GUEST"] = "guest";
    GroupAccessLevelEnum["FRIEND"] = "friend";
    GroupAccessLevelEnum["MEMBER"] = "member";
    GroupAccessLevelEnum["ADMIN"] = "admin";
    GroupAccessLevelEnum["OWNER"] = "owner";
})(GroupAccessLevelEnum = exports.GroupAccessLevelEnum || (exports.GroupAccessLevelEnum = {}));
var PortalErrorType;
(function (PortalErrorType) {
    PortalErrorType["ERROR"] = "Error";
    PortalErrorType["WARNING"] = "Warning";
})(PortalErrorType = exports.PortalErrorType || (exports.PortalErrorType = {}));
