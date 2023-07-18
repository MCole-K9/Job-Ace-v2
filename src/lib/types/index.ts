
// Need to tidy up this type, i.e separate the parent and child types
//consider adding role permissions to the type
export type Link = {
    href?: string ;
    label: string;
    icon?: any;
    children?: Link[];
}