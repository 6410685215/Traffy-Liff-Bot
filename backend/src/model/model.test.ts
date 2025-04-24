import * as Inform from './Inform';
import * as Status from './Status';
import * as Location from './Location';

// async function addInform() {
//     const data = {
//         type: "type",
//         user_id: "user_id",
//         user_name: "user_name",
//         group_id: "group_id",
//         oa_id: "oa_id",
//         org_name: "org_name",
//         org_id: "org_id"
//     };
//     const result = await Inform.addInform(data);
//     await addStatus(result.id);
//     console.log(result);
// }

// async function addStatus(id: string) {
//     const data = {
//         status: "status",
//         inform: {
//             connect: { id: id }
//         }
//     };
//     const result = await Status.addStatus(data);
//     console.log(result);
// }

// addInform();
// getInform();

const data = {
    type: "ภัยออนไลน์",
    user_id: "user_id-test-2",
    user_name: "user_name-test-2",
    group_id: "group_id-test-2",
    oa_id: "oa_id-test-2",
    org_name: "org_name-test-2",
    org_id: "org_id-test-2"
};
const statusData = {
    status: "รอรับเรื่อง",
    description: "description",
    photoUrl: "https://picsum.photos/200/300"
};
const statusData2 = {
    status: "กำลังดำเนินการ",
    photoUrl: "https://picsum.photos/200/300?2"
};

const statusData3 = {
    status: "เสร็จสิ้น",
    description: "Test status เสร็จสิ้น",
    photoUrl: "https://picsum.photos/200/300?1"
};

async function addInform() {
    await Status.addStatus({ ...statusData2, inform: { connect: { id: "cm8o5xibm0002ob2bsoxftqks" } }});
    // setTimeout(() => {}, 10000);
    // await Status.addStatus({ ...statusData3, inform: { connect: { id: "cm8o5vm3n0000ob2bsiqqswvt" } }});
}

async function getInform() {
    const result = await Inform.getInform();
    const status: any = [];
    for (const inform of result) {
        const statusResult = await Status.getStatusByInformId(inform.id);
        status.push(statusResult);
    }

    console.log(result);
    console.log(status);
}

addInform();
// getInform();
