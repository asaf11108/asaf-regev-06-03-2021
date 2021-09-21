import { AreaPick, Country } from './shared';
import { AdministrativeArea } from './shared';


export interface AutocompleteOption {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: AreaPick<Country>;
  AdministrativeArea: AreaPick<AdministrativeArea>;
}
