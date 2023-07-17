import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FsApi } from '@firestitch/api';
import { of } from 'rxjs';


@Injectable()
export class ExampleService {

  public names = [];

  constructor(private fsApi: FsApi) {
    this.people = this.people.map((item, index) => {
      item.image = `https://randomuser.me/api/portraits/${item.gender}/${index}.jpg`;
      return item;
    });
  }

  public fetch(keyword, limit = 10, multiple = true) {
    const people = this.people
      .filter((item) => {
        return !keyword ||
          item.firstName.toLowerCase().indexOf(keyword) >= 0 || 
          item.lastName.toLowerCase().indexOf(keyword) >= 0;
      });

    return of(people.splice(0, limit));
  }

  public people: any = [
    {firstName: 'Jessey', lastName: 'Wing', gender: 'men', icon: 'settings' },
    {firstName: 'Linn', lastName: 'Boyce', gender: 'men', icon: 'settings' },
    {firstName: 'Dane', lastName: 'Goullee', gender: 'men', icon: 'settings' },
    {firstName: 'Noelyn', lastName: 'Ottawell', gender: 'women', icon: 'settings' },
    {firstName: 'Petra', lastName: 'Arthey', gender: 'women', icon: 'settings' },
    {firstName: 'Darnell', lastName: 'Banstead', gender: 'men', icon: 'settings' },
    {firstName: 'Teodorico', lastName: 'Petrussi', gender: 'men', icon: 'settings' },
    {firstName: 'Bendick', lastName: 'Swane', gender: 'men', icon: 'settings' },
    {firstName: 'Joel', lastName: 'Losemann', gender: 'men', icon: 'settings' },
    {firstName: 'Petronella', lastName: 'Matusson', gender: 'women', icon: 'settings' },
    {firstName: 'Pansie', lastName: 'McKeggie', gender: 'women', icon: 'settings' },
    {firstName: 'Ardyth', lastName: 'Wark', gender: 'women', icon: 'settings' },
    {firstName: 'Vladimir', lastName: 'Bus', gender: 'men', icon: 'settings' },
    {firstName: 'Gerhard', lastName: 'Angelo', gender: 'men', icon: 'settings' },
    {firstName: 'Willamina', lastName: 'Bartosch', gender: 'women', icon: 'settings' },
    {firstName: 'Niko', lastName: 'Wressell', gender: 'men', icon: 'settings' },
    {firstName: 'Goddard', lastName: 'McEachern', gender: 'men', icon: 'settings' },
    {firstName: 'Verina', lastName: 'Redgrove', gender: 'women', icon: 'settings' },
    {firstName: 'Archie', lastName: 'Dykes', gender: 'men', icon: 'settings' },
    {firstName: 'Shirleen', lastName: 'Stockney', gender: 'women', icon: 'settings' },
    {firstName: 'Constantine', lastName: 'Galland', gender: 'men', icon: 'settings' },
    {firstName: 'Bradford', lastName: 'Yedall', gender: 'men', icon: 'settings' },
    {firstName: 'Perle', lastName: 'Keizman', gender: 'women', icon: 'settings' },
    {firstName: 'Deane', lastName: 'Albinson', gender: 'women', icon: 'settings' },
    {firstName: 'Melisse', lastName: 'McCurrie', gender: 'women', icon: 'settings' },
    {firstName: 'Cosme', lastName: 'Hail', gender: 'men', icon: 'settings' },
    {firstName: 'Verile', lastName: 'Benedyktowicz', gender: 'women', icon: 'settings' },
    {firstName: 'Goldi', lastName: 'Chaff', gender: 'women', icon: 'settings' },
    {firstName: 'Pail', lastName: 'Axcel', gender: 'men', icon: 'settings' },
    {firstName: 'Roderigo', lastName: 'Cunah', gender: 'men', icon: 'settings' },
    {firstName: 'Junette', lastName: 'Swadlen', gender: 'women', icon: 'settings' },
    {firstName: 'Thayne', lastName: 'Buzza', gender: 'men', icon: 'settings' },
    {firstName: 'Dan', lastName: 'Halden', gender: 'men', icon: 'settings' },
    {firstName: 'Wilmar', lastName: 'Bischop', gender: 'men', icon: 'settings' },
    {firstName: 'Kelbee', lastName: 'Ashlin', gender: 'men', icon: 'settings' },
    {firstName: 'Garv', lastName: 'Garnsworthy', gender: 'men', icon: 'settings' },
    {firstName: 'Franky', lastName: 'Kiehl', gender: 'men', icon: 'settings' },
    {firstName: 'Dyanna', lastName: 'Coners', gender: 'women', icon: 'settings' },
    {firstName: 'Joannes', lastName: 'Liggons', gender: 'women', icon: 'settings' },
    {firstName: 'Quinlan', lastName: 'Mogra', gender: 'men', icon: 'settings' },
    {firstName: 'Lydia', lastName: 'Mounce', gender: 'women', icon: 'settings' },
    {firstName: 'Maxwell', lastName: 'Gorton', gender: 'men', icon: 'settings' },
    {firstName: 'Raynor', lastName: 'Etchell', gender: 'men', icon: 'settings' },
    {firstName: 'Kean', lastName: 'Silbersak', gender: 'men', icon: 'settings' },
    {firstName: 'Devlen', lastName: 'Hoyes', gender: 'men', icon: 'settings' },
    {firstName: 'Albertine', lastName: 'Minchell', gender: 'women', icon: 'settings' },
    {firstName: 'Daune', lastName: 'Wathall', gender: 'women', icon: 'settings' },
    {firstName: 'Chris', lastName: 'Doige', gender: 'women', icon: 'settings' },
    {firstName: 'Fiona', lastName: 'Allone', gender: 'women', icon: 'settings' },
    {firstName: 'Klara', lastName: 'De Gowe', gender: 'women', icon: 'settings' },
    {firstName: 'Kimberly', lastName: 'Mathias', gender: 'women', icon: 'settings' },
    {firstName: 'Jacquelynn', lastName: 'Marjot', gender: 'women', icon: 'settings' },
    {firstName: 'Lucius', lastName: 'Vacher', gender: 'men', icon: 'settings' },
    {firstName: 'Eziechiele', lastName: 'Mathys', gender: 'men', icon: 'settings' },
    {firstName: 'Gwenneth', lastName: 'Lavery', gender: 'women', icon: 'settings' },
    {firstName: 'Ellette', lastName: 'Benedek', gender: 'women', icon: 'settings' },
    {firstName: 'Myrtice', lastName: 'Michin', gender: 'women', icon: 'settings' },
    {firstName: 'Ed', lastName: 'Gautrey', gender: 'men', icon: 'settings' },
    {firstName: 'Kathryne', lastName: 'Salerg', gender: 'women', icon: 'settings' },
    {firstName: 'Letizia', lastName: 'Petranek', gender: 'women', icon: 'settings' },
    {firstName: 'Wade', lastName: 'Egle of Germany', gender: 'men', icon: 'settings' },
    {firstName: 'Joanie', lastName: 'Blaver', gender: 'women', icon: 'settings' },
    {firstName: 'Derk', lastName: 'Genike', gender: 'men', icon: 'settings' },
    {firstName: 'Brigg', lastName: 'Sichardt', gender: 'men', icon: 'settings' },
    {firstName: 'Alric', lastName: 'Jorn', gender: 'men', icon: 'settings' },
    {firstName: 'Bond', lastName: 'Riden', gender: 'men', icon: 'settings' },
    {firstName: 'Clay', lastName: 'Chicken', gender: 'men', icon: 'settings' },
    {firstName: 'Tricia', lastName: 'Alsina', gender: 'women', icon: 'settings' },
    {firstName: 'Godart', lastName: 'Clamo', gender: 'men', icon: 'settings' },
    {firstName: 'Nicole', lastName: 'St Ledger', gender: 'women', icon: 'settings' },
    {firstName: 'Vivien', lastName: 'Kienlein', gender: 'women', icon: 'settings' },
    {firstName: 'Sheryl', lastName: 'Tawn', gender: 'women', icon: 'settings' },
    {firstName: 'Mercedes', lastName: 'Ellingsworth', gender: 'women', icon: 'settings' },
    {firstName: 'Heinrik', lastName: 'Timbridge', gender: 'men', icon: 'settings' },
    {firstName: 'Cornelius', lastName: 'Pearsall', gender: 'men', icon: 'settings' },
    {firstName: 'Reeba', lastName: 'Cowx', gender: 'women', icon: 'settings' },
    {firstName: 'Phineas', lastName: 'Benkin', gender: 'men', icon: 'settings' },
    {firstName: 'Marla', lastName: 'MacFadyen', gender: 'women', icon: 'settings' },
    {firstName: 'Sol', lastName: 'Piesold', gender: 'men', icon: 'settings' },
    {firstName: 'Bary', lastName: 'Brockton', gender: 'men', icon: 'settings' },
    {firstName: 'Daniele', lastName: 'Gouldthorpe', gender: 'women', icon: 'settings' },
    {firstName: 'Horace', lastName: 'Chaundy', gender: 'men', icon: 'settings' },
    {firstName: 'Karlis', lastName: 'Persitt', gender: 'men', icon: 'settings' },
    {firstName: 'Thayne', lastName: 'Blaver', gender: 'men', icon: 'settings' },
    {firstName: 'Marcus', lastName: 'Allnutt', gender: 'men', icon: 'settings' },
    {firstName: 'Bel', lastName: 'Toft', gender: 'women', icon: 'settings' },
    {firstName: 'Jean', lastName: 'Speake', gender: 'women', icon: 'settings' },
    {firstName: 'Skyler', lastName: 'Goering', gender: 'men', icon: 'settings' },
    {firstName: 'Lila', lastName: 'Goard', gender: 'women', icon: 'settings' },
    {firstName: 'Georgine', lastName: 'Fundell', gender: 'women', icon: 'settings' },
    {firstName: 'Rollins', lastName: 'Stigell', gender: 'men', icon: 'settings' },
    {firstName: 'Sheridan', lastName: 'Claypool', gender: 'men', icon: 'settings' },
    {firstName: 'Hanny', lastName: 'Pengilly', gender: 'women', icon: 'settings' },
    {firstName: 'Corliss', lastName: 'Flanigan', gender: 'women', icon: 'settings' },
    {firstName: 'Annmarie', lastName: 'Roder', gender: 'women', icon: 'settings' },
    {firstName: 'Ellary', lastName: 'Winspire', gender: 'men', icon: 'settings' },
    {firstName: 'Alisun', lastName: 'Clixby', gender: 'women', icon: 'settings' },
    {firstName: 'Sonnnie', lastName: 'Sukbhans', gender: 'women', icon: 'settings' },
    {firstName: 'Wenda', lastName: 'Dolley', gender: 'women'}
  ];

}
