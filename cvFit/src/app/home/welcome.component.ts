import { Component } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Home';
  public longTextChris = 'Need help getting started in your body building journey?  This is the place to be!  The team is inteligent, helpful, and personable.  They helped me to become the person I am today.  I would highly recommend the in person training sessions as well as making use of all the awesome tools the team provides via the website';
  public longTextArnold = 'Simply, with their help I achieved my goal of putting on weight, one which I have struggled with for years. With their help I have gained 13kg+ and my strength has more than doubled. They really helped me by giving me the tools to grow, such as diet and training regimes.';
  public longTextSimone = 'Their Personal Training is really great. I was skinny but too unmotivated and shy to go to the gym. I had Tommy as my personal trainer and now I noticed a positive change in my appearance. I am happy and now more confident with myself. I definitely recommend Tommy and Susan to anyone looking for great quality personal training.';
  openDialog(){
    console.log('Hi');
  }
}