var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
var Md2Tree = (function () {
    function Md2Tree() {
        this.value = [];
    }
    return Md2Tree;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], Md2Tree.prototype, "value", void 0);
Md2Tree = __decorate([
    Component({selector: 'md2-tree',
        template: "<md2-tree-item *ngFor=\"let v of value\" [value]=\"v\"></md2-tree-item>",
        styles: ["md2-tree{display:block;list-style:none;padding:0;margin:0}md2-tree md2-tree{padding-left:15px;display:none}.md2-tree-expanded>md2-tree{display:block}md2-tree-item{display:block;margin:3px 0 0 16px}.md2-tree-item{height:24px}.md2-tree-node-icon{display:inline-block;cursor:pointer}.md2-tree-node-icon .expand{display:none}.md2-tree-expanded>.md2-tree-item>.md2-tree-node-icon .collapse{display:none}.md2-tree-expanded>.md2-tree-item>.md2-tree-node-icon .expand{display:inline-block}.md2-tree-node-leaf .md2-tree-node-icon{display:none}.md2-tree-node-label{vertical-align:top;line-height:24px} /*# sourceMappingURL=tree.css.map */ "],
        host: {
            'role': 'tree',
        },
        encapsulation: ViewEncapsulation.None
    })
], Md2Tree);
export { Md2Tree };
var Md2TreeItem = (function () {
    function Md2TreeItem() {
        this._isExpanded = false;
        this.value = null;
    }
    Object.defineProperty(Md2TreeItem.prototype, "isExpanded", {
        get: function () { return this._isExpanded; },
        enumerable: true,
        configurable: true
    });
    Md2TreeItem.prototype._handleClick = function () {
        this._isExpanded = !this._isExpanded;
    };
    return Md2TreeItem;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], Md2TreeItem.prototype, "value", void 0);
Md2TreeItem = __decorate([
    Component({selector: 'md2-tree-item',
        template: "<div class=\"md2-tree-item\"><span class=\"md2-tree-node-icon\" (click)=\"_handleClick()\"><svg class=\"collapse\" fill=\"#757575\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path></svg> <svg class=\"expand\" fill=\"#757575\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path d=\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z\"></path></svg> </span><span class=\"md2-tree-node-label\">{{ value.value }}</span><ng-content></ng-content></div><md2-tree *ngIf=\"value.children\" [value]=\"value.children\"></md2-tree>",
        styles: ["md2-tree{display:block;list-style:none;padding:0;margin:0}md2-tree md2-tree{padding-left:15px;display:none}.md2-tree-expanded>md2-tree{display:block}md2-tree-item{display:block;margin:3px 0 0 16px}.md2-tree-item{height:24px}.md2-tree-node-icon{display:inline-block;cursor:pointer}.md2-tree-node-icon .expand{display:none}.md2-tree-expanded>.md2-tree-item>.md2-tree-node-icon .collapse{display:none}.md2-tree-expanded>.md2-tree-item>.md2-tree-node-icon .expand{display:inline-block}.md2-tree-node-leaf .md2-tree-node-icon{display:none}.md2-tree-node-label{vertical-align:top;line-height:24px} /*# sourceMappingURL=tree.css.map */ "],
        host: {
            'role': 'tree-item',
            '[class.md2-tree-expanded]': 'isExpanded',
            '[class.md2-tree-node-leaf]': '!value.children',
        },
        encapsulation: ViewEncapsulation.None
    })
], Md2TreeItem);
export { Md2TreeItem };
var Md2TreeModule = Md2TreeModule_1 = (function () {
    function Md2TreeModule() {
    }
    Md2TreeModule.forRoot = function () {
        return {
            ngModule: Md2TreeModule_1,
            providers: []
        };
    };
    return Md2TreeModule;
}());
Md2TreeModule = Md2TreeModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Md2Tree, Md2TreeItem],
        declarations: [Md2Tree, Md2TreeItem]
    })
], Md2TreeModule);
export { Md2TreeModule };
var Md2TreeModule_1;
//# sourceMappingURL=tree.js.map