import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import config from './aws-exports';
import { v4 as uuid } from 'uuid';
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { updateUser as UpdateUser } from './graphql/mutations'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: User;
  usernameCopy: string;
  avatarUrl: string;
  private file: File | null = null;
  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.usernameCopy = this.currentUser.name;
    this.emailCopy = this.currentUser.name;
    console.log('Current user: ', this.currentUser);
    updateImage(this.currentUser.imageUri.key);
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    const document.getElementById("edit-image-button");
    document.style["background-color"] = "green";
  }

  async function updateImage(key) {
    try {
      const imageData = await Storage.get(key)
      const avatar.getElementById("user-avatar");
      avatar.src = imageData;
    } catch(err) {
      console.log('error: ', err)
    }
  }

  async updateUser(): void {
    // Maxime's logic
    if (file || this.currentUser.name != this.usernameCopy || this.currentUser.email != this.emailCopy) {

      if(file) {
        const { name: fileName, type: mimeType } = file;
        const key = `${uuid()}${fileName}`;
        const fileForUpload = {
            bucket,
            key,
            region,
        } ;

        try {
          await Storage.put(key, file, {
            contentType: mimeType;
          });
          console.log('Successfully uploaded image to S3 bucket!');
          this.currentUser.imageUri = fileForUpload;
        } catch (err) {
          console.log('error: ', err);
        }

      }

      await API.graphql(graphqlOperation(UpdateUser, { input: this.currentUser }));
      console.log('Successfully updated user data!');

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    }
  }

}
