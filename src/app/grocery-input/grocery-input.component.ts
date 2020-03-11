import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-input',
  templateUrl: './grocery-input.component.html',
  styleUrls: ['./grocery-input.component.css']
})
export class GroceryInputComponent implements OnInit {
  //listItem: string = '';
  listItem = {name: '', id: 0};
  list = [];
//  = 'Enter a valid item to be added to list.'
  errorMsg: string;
  hideErrorMsg: boolean;
  
  duplicateMsg: string;
  hideDuplicateMsg: boolean;

  validDataMsg: string;
  hideValidDataMsg: boolean;

  delItemSuccessMsg: string;
  hideDelItemSuccessMsg: boolean;

  constructor() { }

  ngOnInit(): void {
    // seting the initial values of the 4 bools
  }

  private initializeBools(){
    this.hideErrorMsg = true;
    this.hideDuplicateMsg = true;
    this.hideValidDataMsg = true;
    this.hideDelItemSuccessMsg = true;
  }
  
  addListItem(){
    if(this.listItem.name.trim() != ''){
      this.initializeBools();
      // CHECK IF ITEM ALREADY EXISTS IN LIST -
      // when typed as is, typed in singular form or in plural form
      if(this.list.some(li => 
        (li.name.trim() === this.listItem.name || li.name.trim() === this.listItem.name+'s' ||
        li.name.trim() === this.listItem.name.slice(0,-1) || li.name.trim() === this.listItem.name.slice(0,-2) || li.name.trim() === this.listItem.name+'es') && (this.listItem.id == 0))){
          this.hideDuplicateMsg = false;
          this.duplicateMsg = `The entered item "${this.listItem.name}" already exists in list.`
      }  
      else{
        if(this.listItem.id == 0){
          this.hideDuplicateMsg = true;
          this.list.push({name: this.listItem.name.trim(), id: new Date().getTime(), strike: false});
          console.log(this.list);
        }
      } 
      this.listItem = {
        name: '',
        id: 0
      }
    }else{
      this.hideErrorMsg = false;
      this.errorMsg = 'Enter a valid item.'
    }
  }// end of addListItem


  // Edit an item in the list
  editListItem(item){
    this.initializeBools();
    this.listItem = item;
  }

  // Delete an item from list typed in through the text box
  delListItem(item){
    this.initializeBools();
    for(let i=0; i<this.list.length; i++){
      if(item.id == this.list[i].id){
        // delete the item
        this.list.splice(i, 1);
        this.hideDelItemSuccessMsg = false;
        this.delItemSuccessMsg = `The item "${item.name}" was successfully deleted.`
        break;
      }
    }
  }

  // Strike the list Item
  strikeListItem(item){
    for(let i=0; i<this.list.length; i++){
      if(item.id == this.list[i].id){
        if(this.list[i].strike){
          this.list[i].strike = false;
        }
        else{
          this.list[i].strike = true;
        }
        break;
      }
    }
  }
}


// Validations to be done - 
// 1. No items in list ---> Click add button ---> Display Error "Enter a valid item to be added to list" - DONE
// 2. You are at scenario 1 ---> Enter a valid entry ---> New item should be added + Error should go away. Right now,no matter how many items are added, the error Msg does not go away - DONE
// 3. If you enter an already existing item ---> Display Msg ---> Item already exists in list - DONE
// 4. If only spaces entered ----> Display error Msg ---> Enter a valid item to be added to the list - Use angular form validator for this - refer to tv-show-app  - DONE


// // Select items to be deleted
// selectListItem(listItem: string){
//   // change the icon to tickmark
//   // select the icon
//   var circleIcon = document.querySelector('#circle');
//   console.log(circleIcon);

//   // add event listener
//   circleIcon.addEventListener("click", function(){
//     console.log(this);
//   })

//   // add the selectedItem into a new array
//   this.selectedList.push(listItem);
//   //console.log(this.selectedList);
// }


  //   this.list.includes(this.listItem.name) || this.list.includes(this.listItem.name+'s') || this.list.includes(this.listItem.name.slice(0, -1))){
    // // If yes, delete
    //   this.hideItemNotFoundMsg = true;
    //   this.list.splice(this.list.indexOf(this.listItem), 1);