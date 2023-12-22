import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IChatRoom } from '../../models/chatroom';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {

  chats: IChatRoom[] = [];
  chat?: IChatRoom = undefined;

  constructor(public service: ChatService, private router:Router, private route: ActivatedRoute){
    service.get().subscribe(
      res=>this.chats = res
    )
  }

  select = (chat: IChatRoom) => {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        chat: chat.id
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    })
  }
}
