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

  fetch(keyword, existing = [], limit = 10) {

    const people = this.people.filter(item => {

      const exists = existing.find(e => {
        return e.data === item;
      });

      if (exists) {
        return false;
      }

      return !keyword ||
      (item.first_name.toLowerCase().indexOf(keyword) >= 0 || item.last_name.toLowerCase().indexOf(keyword) >= 0);
    });

    return of(people.splice(0, limit));
  }

  public people: any = [
  {first_name: 'Jessey', last_name: 'Wing', gender: 'men'},
  {first_name: 'Linn', last_name: 'Boyce', gender: 'men'},
  {first_name: 'Dane', last_name: 'Goullee', gender: 'men'},
  {first_name: 'Noelyn', last_name: 'Ottawell', gender: 'women'},
  {first_name: 'Petra', last_name: 'Arthey', gender: 'women'},
  {first_name: 'Darnell', last_name: 'Banstead', gender: 'men'},
  {first_name: 'Teodorico', last_name: 'Petrussi', gender: 'men'},
  {first_name: 'Bendick', last_name: 'Swane', gender: 'men'},
  {first_name: 'Joel', last_name: 'Losemann', gender: 'men'},
  {first_name: 'Petronella', last_name: 'Matusson', gender: 'women'},
  {first_name: 'Pansie', last_name: 'McKeggie', gender: 'women'},
  {first_name: 'Ardyth', last_name: 'Wark', gender: 'women'},
  {first_name: 'Vladimir', last_name: 'Bus', gender: 'men'},
  {first_name: 'Gerhard', last_name: 'Angelo', gender: 'men'},
  {first_name: 'Willamina', last_name: 'Bartosch', gender: 'women'},
  {first_name: 'Niko', last_name: 'Wressell', gender: 'men'},
  {first_name: 'Goddard', last_name: 'McEachern', gender: 'men'},
  {first_name: 'Verina', last_name: 'Redgrove', gender: 'women'},
  {first_name: 'Archie', last_name: 'Dykes', gender: 'men'},
  {first_name: 'Shirleen', last_name: 'Stockney', gender: 'women'},
  {first_name: 'Constantine', last_name: 'Galland', gender: 'men'},
  {first_name: 'Bradford', last_name: 'Yedall', gender: 'men'},
  {first_name: 'Perle', last_name: 'Keizman', gender: 'women'},
  {first_name: 'Deane', last_name: 'Albinson', gender: 'women'},
  {first_name: 'Melisse', last_name: 'McCurrie', gender: 'women'},
  {first_name: 'Cosme', last_name: 'Hail', gender: 'men'},
  {first_name: 'Verile', last_name: 'Benedyktowicz', gender: 'women'},
  {first_name: 'Goldi', last_name: 'Chaff', gender: 'women'},
  {first_name: 'Pail', last_name: 'Axcel', gender: 'men'},
  {first_name: 'Roderigo', last_name: 'Cunah', gender: 'men'},
  {first_name: 'Junette', last_name: 'Swadlen', gender: 'women'},
  {first_name: 'Thayne', last_name: 'Buzza', gender: 'men'},
  {first_name: 'Dan', last_name: 'Halden', gender: 'men'},
  {first_name: 'Wilmar', last_name: 'Bischop', gender: 'men'},
  {first_name: 'Kelbee', last_name: 'Ashlin', gender: 'men'},
  {first_name: 'Garv', last_name: 'Garnsworthy', gender: 'men'},
  {first_name: 'Franky', last_name: 'Kiehl', gender: 'men'},
  {first_name: 'Dyanna', last_name: 'Coners', gender: 'women'},
  {first_name: 'Joannes', last_name: 'Liggons', gender: 'women'},
  {first_name: 'Quinlan', last_name: 'Mogra', gender: 'men'},
  {first_name: 'Lydia', last_name: 'Mounce', gender: 'women'},
  {first_name: 'Maxwell', last_name: 'Gorton', gender: 'men'},
  {first_name: 'Raynor', last_name: 'Etchell', gender: 'men'},
  {first_name: 'Kean', last_name: 'Silbersak', gender: 'men'},
  {first_name: 'Devlen', last_name: 'Hoyes', gender: 'men'},
  {first_name: 'Albertine', last_name: 'Minchell', gender: 'women'},
  {first_name: 'Daune', last_name: 'Wathall', gender: 'women'},
  {first_name: 'Chris', last_name: 'Doige', gender: 'women'},
  {first_name: 'Fiona', last_name: 'Allone', gender: 'women'},
  {first_name: 'Klara', last_name: 'De Gowe', gender: 'women'},
  {first_name: 'Kimberly', last_name: 'Mathias', gender: 'women'},
  {first_name: 'Jacquelynn', last_name: 'Marjot', gender: 'women'},
  {first_name: 'Lucius', last_name: 'Vacher', gender: 'men'},
  {first_name: 'Eziechiele', last_name: 'Mathys', gender: 'men'},
  {first_name: 'Gwenneth', last_name: 'Lavery', gender: 'women'},
  {first_name: 'Ellette', last_name: 'Benedek', gender: 'women'},
  {first_name: 'Myrtice', last_name: 'Michin', gender: 'women'},
  {first_name: 'Ed', last_name: 'Gautrey', gender: 'men'},
  {first_name: 'Kathryne', last_name: 'Salerg', gender: 'women'},
  {first_name: 'Letizia', last_name: 'Petranek', gender: 'women'},
  {first_name: 'Wade', last_name: 'Egle of Germany', gender: 'men'},
  {first_name: 'Joanie', last_name: 'Blaver', gender: 'women'},
  {first_name: 'Derk', last_name: 'Genike', gender: 'men'},
  {first_name: 'Brigg', last_name: 'Sichardt', gender: 'men'},
  {first_name: 'Alric', last_name: 'Jorn', gender: 'men'},
  {first_name: 'Bond', last_name: 'Riden', gender: 'men'},
  {first_name: 'Clay', last_name: 'Chicken', gender: 'men'},
  {first_name: 'Tricia', last_name: 'Alsina', gender: 'women'},
  {first_name: 'Godart', last_name: 'Clamo', gender: 'men'},
  {first_name: 'Nicole', last_name: 'St Ledger', gender: 'women'},
  {first_name: 'Vivien', last_name: 'Kienlein', gender: 'women'},
  {first_name: 'Sheryl', last_name: 'Tawn', gender: 'women'},
  {first_name: 'Mercedes', last_name: 'Ellingsworth', gender: 'women'},
  {first_name: 'Heinrik', last_name: 'Timbridge', gender: 'men'},
  {first_name: 'Cornelius', last_name: 'Pearsall', gender: 'men'},
  {first_name: 'Reeba', last_name: 'Cowx', gender: 'women'},
  {first_name: 'Phineas', last_name: 'Benkin', gender: 'men'},
  {first_name: 'Marla', last_name: 'MacFadyen', gender: 'women'},
  {first_name: 'Sol', last_name: 'Piesold', gender: 'men'},
  {first_name: 'Bary', last_name: 'Brockton', gender: 'men'},
  {first_name: 'Daniele', last_name: 'Gouldthorpe', gender: 'women'},
  {first_name: 'Horace', last_name: 'Chaundy', gender: 'men'},
  {first_name: 'Karlis', last_name: 'Persitt', gender: 'men'},
  {first_name: 'Thayne', last_name: 'Blaver', gender: 'men'},
  {first_name: 'Marcus', last_name: 'Allnutt', gender: 'men'},
  {first_name: 'Bel', last_name: 'Toft', gender: 'women'},
  {first_name: 'Jean', last_name: 'Speake', gender: 'women'},
  {first_name: 'Skyler', last_name: 'Goering', gender: 'men'},
  {first_name: 'Lila', last_name: 'Goard', gender: 'women'},
  {first_name: 'Georgine', last_name: 'Fundell', gender: 'women'},
  {first_name: 'Rollins', last_name: 'Stigell', gender: 'men'},
  {first_name: 'Sheridan', last_name: 'Claypool', gender: 'men'},
  {first_name: 'Hanny', last_name: 'Pengilly', gender: 'women'},
  {first_name: 'Corliss', last_name: 'Flanigan', gender: 'women'},
  {first_name: 'Annmarie', last_name: 'Roder', gender: 'women'},
  {first_name: 'Ellary', last_name: 'Winspire', gender: 'men'},
  {first_name: 'Alisun', last_name: 'Clixby', gender: 'women'},
  {first_name: 'Sonnnie', last_name: 'Sukbhans', gender: 'women'},
  {first_name: 'Wenda', last_name: 'Dolley', gender: 'women'}];

}