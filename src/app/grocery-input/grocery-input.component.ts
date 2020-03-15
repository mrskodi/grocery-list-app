import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-input',
  templateUrl: './grocery-input.component.html',
  styleUrls: ['./grocery-input.component.css']
})
export class GroceryInputComponent implements OnInit {
// Declare variable corresponding to [ngModel] in template
  listItem = {name: '', id: 0};
// Declare array to store user list items
  list = [];

// Declare variables for validation messages / bools to store validation status
  errorMsg: string;
  hideErrorMsg: boolean;
  
  duplicateMsg: string;
  hideDuplicateMsg: boolean;

  validDataMsg: string;
  hideValidDataMsg: boolean;

  delItemSuccessMsg: string;
  hideDelItemSuccessMsg: boolean;

  clearItemsMsg: string;
  hideClearItemsMsg: boolean;

  strikeThroughMessage: string;
  hideStrikeThroughMsg: boolean;

  clearAllText: string;
  hideClearAllText: boolean;
  constructor() { }

  ngOnInit(): void {

  }

  // Set initial values of bools and set validation messages
  private initializeBoolsAndMessages(){
    this.hideErrorMsg = true;
    this.hideDuplicateMsg = true;
    this.hideValidDataMsg = true;
    this.hideDelItemSuccessMsg = true;
    this.hideClearItemsMsg = true;
    this.hideStrikeThroughMsg = false;
    this.hideClearAllText = false;
    // Set Validation messages
    this.clearAllText = 'Clear All';
    this.strikeThroughMessage = 'Click on the strikethrough icon at the end of each item to help you keep track of the item progress.'
  }

  // Invalid Item Error
  private enterValidItem(list){
    if(list.length == 0){
      this.hideStrikeThroughMsg = true;
    }
    this.hideStrikeThroughMsg = false;
    this.hideErrorMsg = false;
    this.hideClearAllText = true;
    this.errorMsg = 'Enter a valid item to be added to the list.';
  }

  // Delete Success
  private delSuccessMessages(item){
    this.hideDelItemSuccessMsg = false;
    this.delItemSuccessMsg = `The item "${item}" was successfully deleted.`;
  }
  
  // Clear All Item Messages
  private clearAllItemsMessages(){
    this.clearItemsMsg = 'All items have been successfully cleared!'
    this.hideClearAllText = true;
    this.hideStrikeThroughMsg = true;
  }

  // No Item in List settings
  private noItemInListSettings(){
    this.hideStrikeThroughMsg = true;
    this.hideClearAllText = true;
  }

  // ADD an item to list[]
  // Check if item already exists, if yes, provide message that Item already exists
  // Else, add item to list
  // If user presses enter without any valid item in text box, display 'Enter valid item' message
  addListItem(){
    this.initializeBoolsAndMessages();  
    if(this.listItem.name.trim() != ''){
      // CHECK IF ITEM ALREADY EXISTS IN LIST -
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
      this.enterValidItem(this.list);
    }
  }

  // EDIT an existing item
  // When the user clicks on 'pencil' icon, the item is displayed on the input text box to be edited.
  // The user types in the new value and is updated in the list.
  editListItem(item){
    this.initializeBoolsAndMessages();
    this.listItem = item;
  }

  // DELETE an existing item
  // When user clicks on 'trash' icon, the corresponding item is deleted from list.
  delListItem(item){
    this.initializeBoolsAndMessages();
    for(let i=0; i<this.list.length; i++){
      if(item.id == this.list[i].id){
        // delete the item
        this.list.splice(i, 1);
        this.delSuccessMessages(item.name);
        break;
      }
    }
    if(this.list.length == 0){
      // this.hideStrikeThroughMsg = true;
      // this.hideClearAllText = true;
      this.noItemInListSettings();
    }
  }

  // CLEAR ALL items from list
  // When user clicks on 'Clear All', all items are removed.
  clearAllItemsFromList(){
    this.initializeBoolsAndMessages();
    this.hideClearItemsMsg = false;
    if(this.list.length > 0){
      for(let i=this.list.length; i>=0; i--){
        console.log(this.list[i]);
        this.list.pop();
        this.clearAllItemsMessages();
      }
    }
  }

  // STRIKE/UNSTRIKE the list Item
  // Upon clicking the strikethrough icon at the end of each item,
  // the user is able to either enable or disable strikethrough for that respective item.
  strikeListItem(item){
    this.initializeBoolsAndMessages();
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