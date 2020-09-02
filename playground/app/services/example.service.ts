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
    const people = this.people.filter(item => {
      return !keyword ||
      (item.first_name.toLowerCase().indexOf(keyword) >= 0 || item.last_name.toLowerCase().indexOf(keyword) >= 0);
    });

    return of(people.splice(0, limit));
  }

  public people: any = [
  {first_name: 'Jessey', last_name: 'Wing', gender: 'men', icon: 'settings' },
  {first_name: 'Linn', last_name: 'Boyce', gender: 'men', icon: 'settings' },
  {first_name: 'Dane', last_name: 'Goullee', gender: 'men', icon: 'settings' },
  {first_name: 'Noelyn', last_name: 'Ottawell', gender: 'women', icon: 'settings' },
  {first_name: 'Petra', last_name: 'Arthey', gender: 'women', icon: 'settings' },
  {first_name: 'Darnell', last_name: 'Banstead', gender: 'men', icon: 'settings' },
  {first_name: 'Teodorico', last_name: 'Petrussi', gender: 'men', icon: 'settings' },
  {first_name: 'Bendick', last_name: 'Swane', gender: 'men', icon: 'settings' },
  {first_name: 'Joel', last_name: 'Losemann', gender: 'men', icon: 'settings' },
  {first_name: 'Petronella', last_name: 'Matusson', gender: 'women', icon: 'settings' },
  {first_name: 'Pansie', last_name: 'McKeggie', gender: 'women', icon: 'settings' },
  {first_name: 'Ardyth', last_name: 'Wark', gender: 'women', icon: 'settings' },
  {first_name: 'Vladimir', last_name: 'Bus', gender: 'men', icon: 'settings' },
  {first_name: 'Gerhard', last_name: 'Angelo', gender: 'men', icon: 'settings' },
  {first_name: 'Willamina', last_name: 'Bartosch', gender: 'women', icon: 'settings' },
  {first_name: 'Niko', last_name: 'Wressell', gender: 'men', icon: 'settings' },
  {first_name: 'Goddard', last_name: 'McEachern', gender: 'men', icon: 'settings' },
  {first_name: 'Verina', last_name: 'Redgrove', gender: 'women', icon: 'settings' },
  {first_name: 'Archie', last_name: 'Dykes', gender: 'men', icon: 'settings' },
  {first_name: 'Shirleen', last_name: 'Stockney', gender: 'women', icon: 'settings' },
  {first_name: 'Constantine', last_name: 'Galland', gender: 'men', icon: 'settings' },
  {first_name: 'Bradford', last_name: 'Yedall', gender: 'men', icon: 'settings' },
  {first_name: 'Perle', last_name: 'Keizman', gender: 'women', icon: 'settings' },
  {first_name: 'Deane', last_name: 'Albinson', gender: 'women', icon: 'settings' },
  {first_name: 'Melisse', last_name: 'McCurrie', gender: 'women', icon: 'settings' },
  {first_name: 'Cosme', last_name: 'Hail', gender: 'men', icon: 'settings' },
  {first_name: 'Verile', last_name: 'Benedyktowicz', gender: 'women', icon: 'settings' },
  {first_name: 'Goldi', last_name: 'Chaff', gender: 'women', icon: 'settings' },
  {first_name: 'Pail', last_name: 'Axcel', gender: 'men', icon: 'settings' },
  {first_name: 'Roderigo', last_name: 'Cunah', gender: 'men', icon: 'settings' },
  {first_name: 'Junette', last_name: 'Swadlen', gender: 'women', icon: 'settings' },
  {first_name: 'Thayne', last_name: 'Buzza', gender: 'men', icon: 'settings' },
  {first_name: 'Dan', last_name: 'Halden', gender: 'men', icon: 'settings' },
  {first_name: 'Wilmar', last_name: 'Bischop', gender: 'men', icon: 'settings' },
  {first_name: 'Kelbee', last_name: 'Ashlin', gender: 'men', icon: 'settings' },
  {first_name: 'Garv', last_name: 'Garnsworthy', gender: 'men', icon: 'settings' },
  {first_name: 'Franky', last_name: 'Kiehl', gender: 'men', icon: 'settings' },
  {first_name: 'Dyanna', last_name: 'Coners', gender: 'women', icon: 'settings' },
  {first_name: 'Joannes', last_name: 'Liggons', gender: 'women', icon: 'settings' },
  {first_name: 'Quinlan', last_name: 'Mogra', gender: 'men', icon: 'settings' },
  {first_name: 'Lydia', last_name: 'Mounce', gender: 'women', icon: 'settings' },
  {first_name: 'Maxwell', last_name: 'Gorton', gender: 'men', icon: 'settings' },
  {first_name: 'Raynor', last_name: 'Etchell', gender: 'men', icon: 'settings' },
  {first_name: 'Kean', last_name: 'Silbersak', gender: 'men', icon: 'settings' },
  {first_name: 'Devlen', last_name: 'Hoyes', gender: 'men', icon: 'settings' },
  {first_name: 'Albertine', last_name: 'Minchell', gender: 'women', icon: 'settings' },
  {first_name: 'Daune', last_name: 'Wathall', gender: 'women', icon: 'settings' },
  {first_name: 'Chris', last_name: 'Doige', gender: 'women', icon: 'settings' },
  {first_name: 'Fiona', last_name: 'Allone', gender: 'women', icon: 'settings' },
  {first_name: 'Klara', last_name: 'De Gowe', gender: 'women', icon: 'settings' },
  {first_name: 'Kimberly', last_name: 'Mathias', gender: 'women', icon: 'settings' },
  {first_name: 'Jacquelynn', last_name: 'Marjot', gender: 'women', icon: 'settings' },
  {first_name: 'Lucius', last_name: 'Vacher', gender: 'men', icon: 'settings' },
  {first_name: 'Eziechiele', last_name: 'Mathys', gender: 'men', icon: 'settings' },
  {first_name: 'Gwenneth', last_name: 'Lavery', gender: 'women', icon: 'settings' },
  {first_name: 'Ellette', last_name: 'Benedek', gender: 'women', icon: 'settings' },
  {first_name: 'Myrtice', last_name: 'Michin', gender: 'women', icon: 'settings' },
  {first_name: 'Ed', last_name: 'Gautrey', gender: 'men', icon: 'settings' },
  {first_name: 'Kathryne', last_name: 'Salerg', gender: 'women', icon: 'settings' },
  {first_name: 'Letizia', last_name: 'Petranek', gender: 'women', icon: 'settings' },
  {first_name: 'Wade', last_name: 'Egle of Germany', gender: 'men', icon: 'settings' },
  {first_name: 'Joanie', last_name: 'Blaver', gender: 'women', icon: 'settings' },
  {first_name: 'Derk', last_name: 'Genike', gender: 'men', icon: 'settings' },
  {first_name: 'Brigg', last_name: 'Sichardt', gender: 'men', icon: 'settings' },
  {first_name: 'Alric', last_name: 'Jorn', gender: 'men', icon: 'settings' },
  {first_name: 'Bond', last_name: 'Riden', gender: 'men', icon: 'settings' },
  {first_name: 'Clay', last_name: 'Chicken', gender: 'men', icon: 'settings' },
  {first_name: 'Tricia', last_name: 'Alsina', gender: 'women', icon: 'settings' },
  {first_name: 'Godart', last_name: 'Clamo', gender: 'men', icon: 'settings' },
  {first_name: 'Nicole', last_name: 'St Ledger', gender: 'women', icon: 'settings' },
  {first_name: 'Vivien', last_name: 'Kienlein', gender: 'women', icon: 'settings' },
  {first_name: 'Sheryl', last_name: 'Tawn', gender: 'women', icon: 'settings' },
  {first_name: 'Mercedes', last_name: 'Ellingsworth', gender: 'women', icon: 'settings' },
  {first_name: 'Heinrik', last_name: 'Timbridge', gender: 'men', icon: 'settings' },
  {first_name: 'Cornelius', last_name: 'Pearsall', gender: 'men', icon: 'settings' },
  {first_name: 'Reeba', last_name: 'Cowx', gender: 'women', icon: 'settings' },
  {first_name: 'Phineas', last_name: 'Benkin', gender: 'men', icon: 'settings' },
  {first_name: 'Marla', last_name: 'MacFadyen', gender: 'women', icon: 'settings' },
  {first_name: 'Sol', last_name: 'Piesold', gender: 'men', icon: 'settings' },
  {first_name: 'Bary', last_name: 'Brockton', gender: 'men', icon: 'settings' },
  {first_name: 'Daniele', last_name: 'Gouldthorpe', gender: 'women', icon: 'settings' },
  {first_name: 'Horace', last_name: 'Chaundy', gender: 'men', icon: 'settings' },
  {first_name: 'Karlis', last_name: 'Persitt', gender: 'men', icon: 'settings' },
  {first_name: 'Thayne', last_name: 'Blaver', gender: 'men', icon: 'settings' },
  {first_name: 'Marcus', last_name: 'Allnutt', gender: 'men', icon: 'settings' },
  {first_name: 'Bel', last_name: 'Toft', gender: 'women', icon: 'settings' },
  {first_name: 'Jean', last_name: 'Speake', gender: 'women', icon: 'settings' },
  {first_name: 'Skyler', last_name: 'Goering', gender: 'men', icon: 'settings' },
  {first_name: 'Lila', last_name: 'Goard', gender: 'women', icon: 'settings' },
  {first_name: 'Georgine', last_name: 'Fundell', gender: 'women', icon: 'settings' },
  {first_name: 'Rollins', last_name: 'Stigell', gender: 'men', icon: 'settings' },
  {first_name: 'Sheridan', last_name: 'Claypool', gender: 'men', icon: 'settings' },
  {first_name: 'Hanny', last_name: 'Pengilly', gender: 'women', icon: 'settings' },
  {first_name: 'Corliss', last_name: 'Flanigan', gender: 'women', icon: 'settings' },
  {first_name: 'Annmarie', last_name: 'Roder', gender: 'women', icon: 'settings' },
  {first_name: 'Ellary', last_name: 'Winspire', gender: 'men', icon: 'settings' },
  {first_name: 'Alisun', last_name: 'Clixby', gender: 'women', icon: 'settings' },
  {first_name: 'Sonnnie', last_name: 'Sukbhans', gender: 'women', icon: 'settings' },
  {first_name: 'Wenda', last_name: 'Dolley', gender: 'women'}];

}
