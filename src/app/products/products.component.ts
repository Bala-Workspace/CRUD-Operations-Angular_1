import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  addProduct: FormGroup;
  submitted = false;
  public title1 = new FormControl('', [Validators.required]);
  public category = new FormControl('', [Validators.required]);
  public author = new FormControl('', [Validators.required]);
  public publisher = new FormControl('', [Validators.required]);
  public obj = {};
  public holdObj = {};
  public getProd: any = [];
  action = "Add";
  objId = 0;
 
  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { }

  ngOnInit() {
    this.addProduct = this.formBuilder.group({
      title1: this.title1,
      category: this.category,
      author: this.author,
      publisher: this.publisher
    });

    this.loadingdata();
    //console.log(this.getProd);
    
}

loadingdata(){
  this.productService.getProds().subscribe(data => {
    this.getProd = data;
    //console.log(this.getProd);
  });
}
  onSubmit(){
    this.submitted = true;

    if (this.addProduct.invalid) {
      console.log('HI');
      return;
    }else {
      console.dir(this.addProduct);
    }

    this.obj = {
      title: this.title1.value,
      category: this.category.value,
      author: this.author.value,
      publisher: this.publisher.value
    };
    //console.log(this.obj);
    
    if(this.action == "Update") {
     // this.obj.id = this.objId;
      Object.assign(this.obj,{id:this.objId})
      this.productService.editProd(this.obj).subscribe(data => {
        console.log(data);
        this.loadingdata(); 
      });
      }else{
      this.productService.postProd(this.obj).subscribe(data => 
        {
          this.holdObj = data
          this.loadingdata(); 
      });
    }
   

  }
  
  editProd(item){
    this.action = "Update";

    this.objId = item.id;

    this.addProduct.patchValue({
      title1 : item.title,
      category : item.category,
      author : item.author,
      publisher : item.publisher
    });
    console.log(item);

  }

  deleteProd(item) {
    console.log(item);
    this.productService.deleteProd(item).subscribe(data => {
      console.log(item);
      this.loadingdata();
    });
  }
  
}
