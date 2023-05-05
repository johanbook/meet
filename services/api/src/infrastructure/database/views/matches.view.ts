import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  materialized: false,
  expression: `
    SELECT 
      s1."profileId" AS "profileId", 
      s1."shownProfileId" as "shownProfileId", 
      profile."name" as "name"
	  FROM swipe s1
	  INNER JOIN swipe s2 ON s1."profileId" = s2."shownProfileId" AND s1."shownProfileId" = s2."profileId" 
    LEFT JOIN profile ON s1."shownProfileId" = profile.id
	  WHERE s1.liked = true AND s2.liked = true;
  `,
})
export class Match {
  @ViewColumn()
  name!: string;

  @ViewColumn()
  profileId!: number;

  @ViewColumn()
  shownProfileId!: number;
}
