import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterwarehouse'
})
export class FilterwarehousePipe implements PipeTransform {

  transform(value: any, filteredString: string) {
    if (value.lenght === 0 || filteredString ===''){
      return value;
    }

    const theGeneralList:any = [];
    for (const item of value){
      if (item['item_serial'] == filteredString
        || item['description'] == filteredString
        || item['name'] == filteredString){
        theGeneralList.push(item);
        console.log("Search written and added: ",item);
      }
    }
    console.log(theGeneralList);
    return theGeneralList;
  }

}
