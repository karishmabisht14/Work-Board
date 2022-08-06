import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { categories } = this.activatedRoute.snapshot.data;
    if (categories && categories.length) {
      this.categories = categories;
    }
  }

  goto = (category: any) => {
    if (category.categoryCode.length) {
      let path = `category/${category.categoryCode}`;
      this.router.navigate([path], { state: { category } });
    }
  };
}
