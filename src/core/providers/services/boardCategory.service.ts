import { SharedService } from 'src/core/providers/services/shared.service';
import { ApiService } from 'src/core/providers/services/api.service';
import { ApiEndPoints } from 'src/core/providers/constants/api-endpoints.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class BoardCategoryService {
    categories: any = [];
    constructor(
        private _apiService: ApiService
    ) { }

    getCategories(): Observable<any> {
        return this._apiService
            .get(ApiEndPoints.categories).pipe(map((data) => {
                if (data.length) {
                    this.setCategoryData(data);
                }
                return data;
            })
            );
    }

    public setCategoryData(data: any = []) {
        this.categories = data;
    }

    public getCategoryData() {
        return this.categories;
    }

}
