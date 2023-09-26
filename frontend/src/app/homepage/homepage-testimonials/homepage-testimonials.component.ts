import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-testimonials',
  templateUrl: './homepage-testimonials.component.html',
  styleUrls: ['./homepage-testimonials.component.scss'],
})
export class HomepageTestimonialsComponent implements OnInit {
  //The function creates a carousel item that consists of three testimonials.
  // Sample array of numbers
  groupsOfItems: testimonial[][] = [];

  ngOnInit(): void {
    this.groupsOfItems = this.createSubArraysOfThree();
  }

  testimonials: testimonial[] = [
    {
      name: 'Peter Mbeki',
      position: 'Code 08 Student',
      imageUrl:
        'https://storage.googleapis.com/drivingschool-7c02e.appspot.com/1693050552197-christopher-campbell-rDEOVtE7vOs-unsplash.jpg?GoogleAccessId=firebase-adminsdk-1cajy%40drivingschool-7c02e.iam.gserviceaccount.com&Expires=253402300799&Signature=rsh95NHi1Hwla5h0Wt%2BeOLvrm%2BgmzvHpH3A5kylxxQ2atdw4MPFx%2BM3b9NhXM5rHy%2FtrzQcpwSEAqtMpiVJCiGc%2FHp9emP2k1uTIwQwRKIEtsTMLm%2Bun5Mu8Zacrks7WX6lAbNTSvRrtJnUSmzv7l09Rpqjsk3Kwe2v2IzhsDqOl2f58fpUe83w1Px22ataNMFGwYIPQqfWiwEH0b8%2Bni0Zlby7pc%2FEt23F1TPxsgSNW61IbGPMf%2BGway%2FcxL4ywVKUzpkvpsxIDsQiNafz6AL7OBN%2BPXE87FoqfnCmci2quaQBmt%2F9YKrOpphQowrJ2z95Z8h9Ylx3ilKkxDIB0yA%3D%3D&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Alex Horwitz',
      position: 'Stack Electronics',
      imageUrl:
        'https://images.unsplash.com/flagged/photo-1562522326-27f8c6aeab68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Desmond Zulu',
      position: 'Code 10 Student',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1664301183594-03188b856b16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Teresa May',
      position: 'Code 10 Student',
      imageUrl:
        'https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Maggie McLoan',
      position: 'Photographer at Studio SA',
      imageUrl:
        'https://images.unsplash.com/photo-1522465744392-1845e20b512c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Alexa Horwitz',
      position: 'ront-end Developer in Cape Town',
      imageUrl:
        'https://images.unsplash.com/photo-1583195763986-0231686dcd43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Khanyisa Khumalo',
      position: 'Founder at ET Company',
      imageUrl:
        'https://images.unsplash.com/photo-1608318704681-a3b5da31db1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU5fHx3b21lbnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Maggie McLoan',
      position: 'Student at UCT',
      imageUrl:
        'https://images.unsplash.com/photo-1573496527892-904f897eb744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Luke Henry',
      position: 'Learners Student',
      imageUrl:
        'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Samantha Vuyo',
      position: 'Code 10 Student',
      imageUrl:
        'https://images.unsplash.com/flagged/photo-1558990397-489e8f26f88c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1542&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Andrew Stewart',
      position: 'Code 08 Student',
      imageUrl:
        'https://images.unsplash.com/photo-1633657321317-f1e83e9b2b57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
    {
      name: 'Anisha Kassim',
      position: 'Designer at XYZ Studios',
      imageUrl:
        'https://images.unsplash.com/photo-1527877083249-88d406b6ac27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      content: `Lorem ipsum dolor sit
      amet, consectetur adipisicing elit. Quod eos id officiis hic
      tenetur quae quaerat ad velit ab hic tenetur.`,
    },
  ];

  //The functions creates sub arrays consisting of three testimonials
  createSubArraysOfThree(): testimonial[][] {
    const result: testimonial[][] = [];
    // Loop through the array in groups of three
    for (let i = 0; i < this.testimonials.length; i += 3) {
      // Slice the input array to get the next three items
      const subarray = this.testimonials.slice(i, i + 3);

      // Push the subarray into the result array
      result.push(subarray);
    }

    return result;
  }
}

type testimonial = {
  name: string;
  imageUrl: string;
  position: string;
  content: string;
};
