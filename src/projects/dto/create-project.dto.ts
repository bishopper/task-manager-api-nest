import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ description: 'The name of the project' })
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    required: false,
  })
  description?: string;
}
