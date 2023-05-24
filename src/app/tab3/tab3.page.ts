import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../shared/product.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  bookingForm: FormGroup = this.fb.group({
    name: [''],
    desc: [''],
    price: ['']

  });

  constructor(
    private aptService: ProductService,
    private router: Router,
    public fb: FormBuilder

  ) { }

  ngOnInit() {  }

  formSubmit() {

    if (!this.bookingForm.valid) {
      console.log("não enviou...");
      return false;

    } else {
      
      console.log("enviando...");

      this.aptService.createProduct(this.bookingForm.value).then((res: any) => {

        console.log(res);
        console.log("Enviado: ", this.bookingForm.value);

        this.bookingForm.reset();

        this.router.navigate(['/']);

      }).catch((error: any) => console.log(error));
        return;
    }
  }
}

