import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatMessage, IChatMessage, IChatRoom } from '../../models/chatroom';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/services/user/user.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { IUser } from 'src/app/user/models/user';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})
export class ChatDetailsComponent {

  @ViewChild('messageBox') private messageBox: ElementRef
  @Input() chat?:IChatRoom = undefined;
  private connection: HubConnection | undefined

  constructor(public service:ChatService, public auth: AuthService, private route:ActivatedRoute, public userService: UserService){
    this.route.queryParams.subscribe(
      params => {
        params['chat'] && this.service.getById(params['chat'])
        .subscribe(async (res) =>
          {          
            if(this.chat){
              await this.leave(this.chat.id)
              await this.connection?.stop()
            }
            this.chat = res
            this.scrollToBottom()
            await this.init();
            this.join(res.id)
          }
        )
      }
    )
  }

  public join = (chatId:string | number, redirectUrl?:string) => {
    return this.connection?.invoke('Join', `${chatId}`)
  }

  public leave = (chatId:string | number, redirectUrl?:string) => {
    return this.connection?.invoke('Leave', `${chatId}`)
  }

  public send = (text:string) => {
    const message = {
      owner: {id: this.auth.getId()} as IUser,
      chatroom: this.chat,
      text: text
    } as IChatMessage;
    //this.chat?.messages?.push(message)
    return this.service.post(message).subscribe()
  }

  public init = async () => {
    if (this.auth.isLoggedIn()){
      this.connection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Information)
        .withUrl(`${environment.hubUrl}`)
        .withAutomaticReconnect()
        .build()
      await this.connection.start()
      this.connection.on('SendMessage', (message:IChatMessage)=>{
        this.chat?.messages?.push(message)
        this.scrollToBottom()
      })
    }
  }

  private scrollToBottom = () => {
    //For some reason, array.push(something) is not instantaneous.
    //If we don't add a bit of delay, the scroll will happen before the element is added. Which is weird.
    //But anyway: let's timeout
    setTimeout(()=>{
      this.messageBox.nativeElement.scrollTop =  this.messageBox.nativeElement.scrollHeight
    }, 20)
  }
}
