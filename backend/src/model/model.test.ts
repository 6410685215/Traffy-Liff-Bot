import * as Inform from './Inform';
import * as Status from './Status';

async function addInform() {
    const data = {
        type: "type",
        user_id: "user_id",
        user_name: "user_name",
        group_id: "group_id",
        oa_id: "oa_id",
        org_name: "org_name",
        org_id: "org_id"
    };
    const result = await Inform.addInform(data);
    await addStatus(result.id);
    console.log(result);
}

async function addStatus(id: string) {
    const data = {
        status: "status",
        inform: {
            connect: { id: id }
        }
    };
    const result = await Status.addStatus(data);
    console.log(result);
}

async function getInform() {
    const result = await Inform.getInform();
    const status = await Status.getStatusByInformId(result[0].id);
    console.log(status);
    console.log(result);
}

addInform();
getInform();
