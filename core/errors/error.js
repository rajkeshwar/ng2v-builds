// TODO(kara): Revisit why error messages are not being properly set.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Wrapper around Error that sets the error message.
 * @docs-private
 */
var MdError = (function (_super) {
    __extends(MdError, _super);
    function MdError(value) {
        var _this = _super.call(this) || this;
        _this.message = value;
        return _this;
    }
    return MdError;
}(Error));
export { MdError };
//# sourceMappingURL=error.js.map