import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailsComponent } from './components/chat-details/chat-details.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ChrComponentsModule } from '../chr-components/chr-components.module';

const chatRoutes: Routes = [
  {
    path: 'chat',
    component: ChatListComponent,
    data: { privilege: 'ITEM_LIST' },
  },
];

@NgModule({
  declarations: [
    ChatDetailsComponent,
    ChatListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(chatRoutes),
    ChrComponentsModule,
  ]
})
export class ChatModule { }
