import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} */

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'name', 'lastName', 'details'];

  constructor(private usersService: UsersService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.retrieveUsers();
  }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
  retrieveUsers() {
    this.spinnerService.start();
    this.usersService.getUsers().subscribe(
      (users: any) => {
        console.log("Users "+JSON.stringify(users));
        this.dataSource = new MatTableDataSource(users);
        this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error: "+JSON.stringify(err));
        this.spinnerService.stop();
      }
    )
  }
}
