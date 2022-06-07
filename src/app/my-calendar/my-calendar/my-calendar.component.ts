import { fadeIn } from './../../animations/animations';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss'],
  animations: [
   fadeIn
  ]
})
export class MyCalendarComponent implements OnInit, AfterViewInit {
  Year:number = 1900;
  Month:number = 1;
  curr_month:string="Januar 1900";
  @Input("text-color-main") textColorMain = "black";
  @Input("text-color-secondary") textColorSecondary = "lightgrey";
  @Input("background-color") backgroundColor = "white";
  @Input("controls-hidden") controlsHidden=true;
  @Input("border-color-current") borderColorCurent="blue";
  @Input("calendar-hidden") calendarHidden=false;
  @Input("datum") datum = "01.01.1900";
  @Input("title") title = "Datum:";
  @Input("hover-color") hoverColor="lightblue";
  @Input('selected-color') selectedColor="lightblue";

  hasFocus=false;
  //height: number = 0;
  //width: number = 0;
  fadeOn=false;

  days = new Array<string>(42).fill("");
  color= new Array<string>(42).fill("");
  border= new Array<string>(42).fill("");
  hover= new Array<string>(42).fill("");
  selected = new Array<boolean>(42).fill(false);
  constructor(public elRef: ElementRef) { 
    //console.log(this.days);
    
  }


  @HostListener('document:click', ['$event'])
  clickout(){
    if(!this.hasFocus)
    this.hideCalendar();
  }


   setFocus(state:boolean){
     this.hasFocus=state;
   }


  ngAfterViewInit(): void {
    this.elRef.nativeElement.focus();
    //this.height = window.innerHeight;
    //this.width = window.innerWidth;
  }
  

  ngOnInit(): void {
    setTimeout(() => {
      this.init();

      this.setCalendar();
    }, 50);
  
  
  
  }
  closeEsc(code: number){
    if(code === 27)
    {
      console.log("uso")
      this.hideCalendar();
    }
    
  }
  setHoverColor(index:number){
    this.hover[index] = this.hoverColor;
  }
  desetHoverColor(index:number){
    if(this.selected[index])
       this.hover[index]=this.selectedColor;
    else
      this.hover[index] = "";
  }
  init()
  {
      if(this.datum==""){
        let currDate=new Date();
        //this.datum = this.dateToText(currDate);
        let datePices=this.textToDate(this.datum);
        this.Year=currDate.getFullYear();//datePices.Year;
        this.Month =currDate.getMonth()//datePices.Month;

      }
  }
  setDate(i:number)
  {
    for(let j=0;j<=41;j++)
      this.selected[j]=false;

    if(this.color[i]==this.textColorSecondary)
    {
      return;
    }
    let selectedDate = new Date(this.Year,this.Month,+this.days[i]);
    this.datum=this.dateToText(selectedDate);
    this.hideCalendar();
    this.selected[i]=true;
    this.setSelected();
  }
  dateToText(date:Date):string {
    let result="";
    if(date.getDate().toString().length==1)
    {
        result ="0" +date.getDate().toString();
    }
    else
    {
      result = date.getDate().toString();
    }

    result+=".";
     
    if((date.getMonth()+1).toString().length==1)
    {
        result +="0" +(date.getMonth()+1).toString();
    }
    else
    {
      result += (date.getMonth()+1).toString();
    }
    result+=".";
     
    result +=date.getFullYear().toString()
    return result;
  }
  textToDate(datum:string){
    let datePices=datum.split(".");
    return {Day:+datePices[0],Month:+datePices[1]-1,Year:+datePices[2]};
  }
  showCalendar(){
    this.fadeOn=true;
    this.calendarHidden=true;
    
  }
  hideCalendar(){
    this.fadeOn=false;
      setTimeout(() => {
          if(this.calendarHidden)
          {
            this.calendarHidden=false;
            (document.getElementById("datum") as HTMLInputElement).blur();
          }
      }, 500);

    
  }
  nextMonth(){
    if(this.Month<11)
    {
      this.Month++;
    }
     else
      {
        this.Year++;
        this.Month=0;
      }
      for(let i=0;i<=41;i++)
        this.selected[i]=false;
    this.setCalendar();
  }
  prevMonth(){
    if(this.Month>0)
    {
      this.Month--;
    }
    else
    {
      this.Year--;
      this.Month=11;
    }
    for(let i=0;i<=41;i++)
      this.selected[i]=false;
    this.setCalendar();
  }

  getMonth()
  {
    switch(this.Month)
    {
      case 0: return "Januar";
      case 1: return "Februar";
      case 2: return "Mart";
      case 3: return "April" ;
      case 4: return "Maj" ;
      case 5: return "Jun";
      case 6: return "Jul";
      case 7: return "Avgust";
      case 8: return "Septembar";
      case 9: return "Oktobar" ;
      case 10: return "Novembar";
      case 11: return "Decembar";

      default: return "";
    }
  }
  setCalendar(){
    
    let firstDay = new Date(this.Year,this.Month,1);
    let lastDay = new Date();
    if(this.Month<11)
      lastDay=new Date(this.Year, this.Month+1,0);
    else
     lastDay=new Date(this.Year+1, 0,0);

    let dayOfWeek=firstDay.getDay();
    if(dayOfWeek==0)
      dayOfWeek=7;
     let currday = 1;

     //alert(lastDay.getMonth());


      
      for(let i=1;i<=lastDay.getDate();i++)
      {
        //alert(dayOfWeek+i-2);
          this.days[dayOfWeek+i-2] = currday.toString();

          /*if(currday.toString().length==1)
              this.days[dayOfWeek+i-2] = " " + this.days[dayOfWeek+i-2] ;*/


          this.color[dayOfWeek+i-2]=this.textColorMain;
          //let currDateTest = new Date(this.Year,this.Month,currday);

          let currentDate = new Date();
          if(this.Year == currentDate.getFullYear() && this.Month == currentDate.getMonth() && currday== currentDate.getDate())
            this.border[dayOfWeek+i-2] = "1px " + this.borderColorCurent + " solid";
          else
            this.border[dayOfWeek+i-2]="";

          let setedDate=this.textToDate(this.datum);
          if(setedDate.Day==i && this.Month == setedDate.Month && setedDate.Year == this.Year)
            this.selected[dayOfWeek+i-2] = true;
          else
            this.selected[dayOfWeek+i-2] = false;

          currday++;
      }

      currday=1;
      for(let i=lastDay.getDate()+dayOfWeek-1;i<=41;i++)
      {
        this.days[i] = currday.toString();

        this.color[i]=this.textColorSecondary;
        currday++;
      }
        lastDay=new Date(this.Year, this.Month,0);
      currday=lastDay.getDate();
      //alert(dayOfWeek);
      for(let i=dayOfWeek-2;i>=0;i--)
      {
        this.days[i] = currday.toString();
        this.color[i]=this.textColorSecondary;
        currday--;
      }
      
      this.curr_month=this.getMonth();
      this.setSelected();

  }
  setSelected()
  {
    for(let i=0;i<=41;i++)
    {
      if(this.selected[i])
      {
        this.hover[i]=this.selectedColor;
      }
      else{
        this.hover[i]="";
      }
    }
  }
}
