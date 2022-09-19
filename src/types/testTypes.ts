import { Tests } from "@prisma/client";

export interface TestsBody {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

export type CreateTestsData = Omit<Tests, "id">;
