import { Injectable } from '@angular/core';


import { of } from 'rxjs';


@Injectable()
export class ExampleService {

  public names = [];
  
  public people: any = [
    { firstName: 'Jessey', lastName: 'Wing', gender: 'Men', icon: 'settings' },
    { firstName: 'Linn', lastName: 'Boyce', gender: 'Men', icon: 'settings' },
    { firstName: 'Dane', lastName: 'Goullee', gender: 'Men', icon: 'settings' },
    { firstName: 'Noelyn', lastName: 'Ottawell', gender: 'Women', icon: 'settings' },
    { firstName: 'Petra', lastName: 'Arthey', gender: 'Women', icon: 'settings' },
    { firstName: 'Darnell', lastName: 'Banstead', gender: 'Men', icon: 'settings' },
    { firstName: 'Teodorico', lastName: 'Petrussi', gender: 'Men', icon: 'settings' },
    { firstName: 'Bendick', lastName: 'Swane', gender: 'Men', icon: 'settings' },
    { firstName: 'Joel', lastName: 'Losemann', gender: 'Men', icon: 'settings' },
    { firstName: 'Petronella', lastName: 'Matusson', gender: 'Women', icon: 'settings' },
    { firstName: 'Pansie', lastName: 'McKeggie', gender: 'Women', icon: 'settings' },
    { firstName: 'Ardyth', lastName: 'Wark', gender: 'Women', icon: 'settings' },
    { firstName: 'Vladimir', lastName: 'Bus', gender: 'Men', icon: 'settings' },
    { firstName: 'Gerhard', lastName: 'Angelo', gender: 'Men', icon: 'settings' },
    { firstName: 'Willamina', lastName: 'Bartosch', gender: 'Women', icon: 'settings' },
    { firstName: 'Niko', lastName: 'Wressell', gender: 'Men', icon: 'settings' },
    { firstName: 'Goddard', lastName: 'McEachern', gender: 'Men', icon: 'settings' },
    { firstName: 'Verina', lastName: 'Redgrove', gender: 'Women', icon: 'settings' },
    { firstName: 'Archie', lastName: 'Dykes', gender: 'Men', icon: 'settings' },
    { firstName: 'Shirleen', lastName: 'Stockney', gender: 'Women', icon: 'settings' },
    { firstName: 'Constantine', lastName: 'Galland', gender: 'Men', icon: 'settings' },
    { firstName: 'Bradford', lastName: 'Yedall', gender: 'Men', icon: 'settings' },
    { firstName: 'Perle', lastName: 'Keizman', gender: 'Women', icon: 'settings' },
    { firstName: 'Deane', lastName: 'Albinson', gender: 'Women', icon: 'settings' },
    { firstName: 'Melisse', lastName: 'McCurrie', gender: 'Women', icon: 'settings' },
    { firstName: 'Cosme', lastName: 'Hail', gender: 'Men', icon: 'settings' },
    { firstName: 'Verile', lastName: 'Benedyktowicz', gender: 'Women', icon: 'settings' },
    { firstName: 'Goldi', lastName: 'Chaff', gender: 'Women', icon: 'settings' },
    { firstName: 'Pail', lastName: 'Axcel', gender: 'Men', icon: 'settings' },
    { firstName: 'Roderigo', lastName: 'Cunah', gender: 'Men', icon: 'settings' },
    { firstName: 'Junette', lastName: 'Swadlen', gender: 'Women', icon: 'settings' },
    { firstName: 'Thayne', lastName: 'Buzza', gender: 'Men', icon: 'settings' },
    { firstName: 'Dan', lastName: 'Halden', gender: 'Men', icon: 'settings' },
    { firstName: 'Wilmar', lastName: 'Bischop', gender: 'Men', icon: 'settings' },
    { firstName: 'Kelbee', lastName: 'Ashlin', gender: 'Men', icon: 'settings' },
    { firstName: 'Garv', lastName: 'Garnsworthy', gender: 'Men', icon: 'settings' },
    { firstName: 'Franky', lastName: 'Kiehl', gender: 'Men', icon: 'settings' },
    { firstName: 'Dyanna', lastName: 'Coners', gender: 'Women', icon: 'settings' },
    { firstName: 'Joannes', lastName: 'Liggons', gender: 'Women', icon: 'settings' },
    { firstName: 'Quinlan', lastName: 'Mogra', gender: 'Men', icon: 'settings' },
    { firstName: 'Lydia', lastName: 'Mounce', gender: 'Women', icon: 'settings' },
    { firstName: 'Maxwell', lastName: 'Gorton', gender: 'Men', icon: 'settings' },
    { firstName: 'Raynor', lastName: 'Etchell', gender: 'Men', icon: 'settings' },
    { firstName: 'Kean', lastName: 'Silbersak', gender: 'Men', icon: 'settings' },
    { firstName: 'Devlen', lastName: 'Hoyes', gender: 'Men', icon: 'settings' },
    { firstName: 'Albertine', lastName: 'Minchell', gender: 'Women', icon: 'settings' },
    { firstName: 'Daune', lastName: 'Wathall', gender: 'Women', icon: 'settings' },
    { firstName: 'Chris', lastName: 'Doige', gender: 'Women', icon: 'settings' },
    { firstName: 'Fiona', lastName: 'Allone', gender: 'Women', icon: 'settings' },
    { firstName: 'Klara', lastName: 'De Gowe', gender: 'Women', icon: 'settings' },
    { firstName: 'Kimberly', lastName: 'Mathias', gender: 'Women', icon: 'settings' },
    { firstName: 'Jacquelynn', lastName: 'Marjot', gender: 'Women', icon: 'settings' },
    { firstName: 'Lucius', lastName: 'Vacher', gender: 'Men', icon: 'settings' },
    { firstName: 'Eziechiele', lastName: 'Mathys', gender: 'Men', icon: 'settings' },
    { firstName: 'Gwenneth', lastName: 'Lavery', gender: 'Women', icon: 'settings' },
    { firstName: 'Ellette', lastName: 'Benedek', gender: 'Women', icon: 'settings' },
    { firstName: 'Myrtice', lastName: 'Michin', gender: 'Women', icon: 'settings' },
    { firstName: 'Ed', lastName: 'Gautrey', gender: 'Men', icon: 'settings' },
    { firstName: 'Kathryne', lastName: 'Salerg', gender: 'Women', icon: 'settings' },
    { firstName: 'Letizia', lastName: 'Petranek', gender: 'Women', icon: 'settings' },
    { firstName: 'Wade', lastName: 'Egle of Germany', gender: 'Men', icon: 'settings' },
    { firstName: 'Joanie', lastName: 'Blaver', gender: 'Women', icon: 'settings' },
    { firstName: 'Derk', lastName: 'Genike', gender: 'Men', icon: 'settings' },
    { firstName: 'Brigg', lastName: 'Sichardt', gender: 'Men', icon: 'settings' },
    { firstName: 'Alric', lastName: 'Jorn', gender: 'Men', icon: 'settings' },
    { firstName: 'Bond', lastName: 'Riden', gender: 'Men', icon: 'settings' },
    { firstName: 'Clay', lastName: 'Chicken', gender: 'Men', icon: 'settings' },
    { firstName: 'Tricia', lastName: 'Alsina', gender: 'Women', icon: 'settings' },
    { firstName: 'Godart', lastName: 'Clamo', gender: 'Men', icon: 'settings' },
    { firstName: 'Nicole', lastName: 'St Ledger', gender: 'Women', icon: 'settings' },
    { firstName: 'Vivien', lastName: 'Kienlein', gender: 'Women', icon: 'settings' },
    { firstName: 'Sheryl', lastName: 'Tawn', gender: 'Women', icon: 'settings' },
    { firstName: 'Mercedes', lastName: 'Ellingsworth', gender: 'Women', icon: 'settings' },
    { firstName: 'Heinrik', lastName: 'Timbridge', gender: 'Men', icon: 'settings' },
    { firstName: 'Cornelius', lastName: 'Pearsall', gender: 'Men', icon: 'settings' },
    { firstName: 'Reeba', lastName: 'Cowx', gender: 'Women', icon: 'settings' },
    { firstName: 'Phineas', lastName: 'Benkin', gender: 'Men', icon: 'settings' },
    { firstName: 'Marla', lastName: 'MacFadyen', gender: 'Women', icon: 'settings' },
    { firstName: 'Sol', lastName: 'Piesold', gender: 'Men', icon: 'settings' },
    { firstName: 'Bary', lastName: 'Brockton', gender: 'Men', icon: 'settings' },
    { firstName: 'Daniele', lastName: 'Gouldthorpe', gender: 'Women', icon: 'settings' },
    { firstName: 'Horace', lastName: 'Chaundy', gender: 'Men', icon: 'settings' },
    { firstName: 'Karlis', lastName: 'Persitt', gender: 'Men', icon: 'settings' },
    { firstName: 'Thayne', lastName: 'Blaver', gender: 'Men', icon: 'settings' },
    { firstName: 'Marcus', lastName: 'Allnutt', gender: 'Men', icon: 'settings' },
    { firstName: 'Bel', lastName: 'Toft', gender: 'Women', icon: 'settings' },
    { firstName: 'Jean', lastName: 'Speake', gender: 'Women', icon: 'settings' },
    { firstName: 'Skyler', lastName: 'Goering', gender: 'Men', icon: 'settings' },
    { firstName: 'Lila', lastName: 'Goard', gender: 'Women', icon: 'settings' },
    { firstName: 'Georgine', lastName: 'Fundell', gender: 'Women', icon: 'settings' },
    { firstName: 'Rollins', lastName: 'Stigell', gender: 'Men', icon: 'settings' },
    { firstName: 'Sheridan', lastName: 'Claypool', gender: 'Men', icon: 'settings' },
    { firstName: 'Hanny', lastName: 'Pengilly', gender: 'Women', icon: 'settings' },
    { firstName: 'Corliss', lastName: 'Flanigan', gender: 'Women', icon: 'settings' },
    { firstName: 'Annmarie', lastName: 'Roder', gender: 'Women', icon: 'settings' },
    { firstName: 'Ellary', lastName: 'Winspire', gender: 'Men', icon: 'settings' },
    { firstName: 'Alisun', lastName: 'Clixby', gender: 'Women', icon: 'settings' },
    { firstName: 'Sonnnie', lastName: 'Sukbhans', gender: 'Women', icon: 'settings' },
    { firstName: 'Wenda with a very very very very very long name', lastName: 'Dolley', gender: 'Women' },
  ];

  constructor() {
    this.people = this.people.map((item, index) => {
      item.image = `https://randomuser.me/api/portraits/${item.gender.toLowerCase()}/${index}.jpg`;

      return item;
    });
  }

  public fetch(keyword, limit = 10) {
    const people = this.people
      .filter((item) => {
        return !keyword ||
          item.firstName.toLowerCase().indexOf(keyword) >= 0 || 
          item.lastName.toLowerCase().indexOf(keyword) >= 0;
      });

    return of(people.splice(0, limit));
  }


}
