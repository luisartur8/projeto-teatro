export type Play = {
  id?: string;
  name: string;
  image: string | null;
  synopsis: string | null;
  gender: string;
  address: string;
  capacity: number;


  directorId?: string;
  theaterId?: string;
  actorId?: string[];

  director?: {
    id: string;
    name: string;
  };

  theater?: {
    id: string;
    name: string;
  };

  actor?: {
    id: string;
    name: string;
  }[];
};
