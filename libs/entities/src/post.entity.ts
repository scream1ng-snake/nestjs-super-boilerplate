import {
  Entity,
  Column,
  PrimaryColumn
} from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryColumn('uuid') 
  id: string;

  @Column() 
  title: string;
  
  @Column() 
  message: string;

  @Column() 
  authorId: string;

  @Column() 
  isPublished: boolean;

  @Column() 
  createdAt: string;

  @Column() 
  updatedAt: string;
}