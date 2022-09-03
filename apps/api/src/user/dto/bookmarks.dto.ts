import { IsJSON, IsNotEmpty } from 'class-validator';

export class BookmarksDto {
  @IsJSON()
  @IsNotEmpty()
  bookmarks: object;
}
