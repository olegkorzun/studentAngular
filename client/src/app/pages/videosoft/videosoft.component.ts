import { Component, OnInit } from '@angular/core';
import { VideoSoftwareDownload } from 'app/app.component';
@Component({
  selector: 'app-videosoft',
  templateUrl: './videosoft.component.html',
  styleUrls: ['./videosoft.component.css']
})
export class VideoSoftComponent implements OnInit {
  videoSoftwareDownload = VideoSoftwareDownload;
  constructor() { }
  ngOnInit() {}
  onSubmit() {}
}
