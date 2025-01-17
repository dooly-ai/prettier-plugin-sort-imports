"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractASTNodes = void 0;
var traverse_1 = __importDefault(require("@babel/traverse"));
var types_1 = require("@babel/types");
function extractASTNodes(ast) {
    var importNodes = [];
    var directives = [];
    (0, traverse_1.default)(ast, {
        Directive: function (_a) {
            var node = _a.node;
            directives.push(node);
            // Trailing comments probably shouldn't be attached to the directive
            node.trailingComments = null;
        },
        ImportDeclaration: function (path) {
            var tsModuleParent = path.findParent(function (p) {
                return (0, types_1.isTSModuleDeclaration)(p);
            });
            if (!tsModuleParent) {
                importNodes.push(path.node);
            }
        },
    });
    return { importNodes: importNodes, directives: directives };
}
exports.extractASTNodes = extractASTNodes;
