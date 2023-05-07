import { PostModule } from '@app/post';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [PostModule],
  exports: [PostModule]
})
export class DomainsModule {}
