import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
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
      let path = `boards/${category.categoryCode}`;
      this.router.navigate([path], { state: { category } });
    }
  };
}
