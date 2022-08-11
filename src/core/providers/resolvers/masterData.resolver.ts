import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BoardCategoryService } from '../services/boardCategory.service';

@Injectable()
export class MasterDataResolver implements Resolve<any> {
    constructor(
        private _categoryService: BoardCategoryService,
    ) { }
    resolve() {
        if (this._categoryService.categories.length === 0) {
            return this._categoryService.getCategories();
        } else {
            return this._categoryService.categories;
        }
    }
}
