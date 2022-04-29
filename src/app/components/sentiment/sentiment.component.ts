import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SentimentService } from 'src/app/services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {

  text = new FormControl('', Validators.required);
  loading = false;
  score: number | undefined;

  constructor(private sentimentService: SentimentService) { }

  ngOnInit(): void {
  }

  analyze(): void {
    this.loading = true;
    this.sentimentService.getSentiment(this.text.value).subscribe({
      next: (data) => {
        console.log(data)
        this.score = data.score
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      }
    })
  }

}
