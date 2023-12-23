interface ICreateCategoryPayload {
  description: string;
}

export class CreateCategoryDTO {
  description?: string;

  constructor(createCategoryPayload: ICreateCategoryPayload) {
    this.description = createCategoryPayload.description;
  }
}
