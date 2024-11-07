import { Controller, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@spuxx-api/src/auth/auth.config';
import { defaultValidationPipe } from '@spuxx-api/src/validation/default-validation.pipe';
import { AuthGuard, HttpLoggingInterceptor, Roles } from '@spuxx/nest-utils';

const requiredRoles = [AuthRole.toledoUser];

@Controller('toledo/list-items')
@ApiTags('Toledo - Lists')
@UsePipes(defaultValidationPipe)
@UseInterceptors(HttpLoggingInterceptor)
@UseGuards(AuthGuard)
@Roles(...requiredRoles)
export class ListItemsController {}
