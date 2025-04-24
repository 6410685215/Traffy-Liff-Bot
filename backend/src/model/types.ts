
//   model Status {
//     id          String   @id @default(cuid())
//     informId    String
//     status      String
//     timeStamp   DateTime @default(now())
//     description String
//     photoUrl    String
//     inform      Inform   @relation(fields: [informId], references: [ID])
//   }

//   model Inform {
//     ID        String   @id @default(cuid())
//     timeStamp DateTime @default(now()) @updatedAt
//     type      String
//     user_id   String
//     user_name String
//     group_id  String
//     oa_id     String
//     org_name  String
//     status    Status[]
//   }

interface InformData {
    type: string;
    user_id: string;
    user_name: string;
    group_id: string;
    oa_id: string;
    org_name: string;
}

interface Status {
    informId: string;
    status: string;
    description?: string;
    photoUrl?: string;
}

interface Groups {
    id: string;
    uuid_qr: string;
    org_name: string;
    org_id: string;
}

export { InformData, Status, Groups };