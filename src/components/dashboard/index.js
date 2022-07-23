import React from "react";
import { Drawer, Button, Divider, Alert } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase.js";
import ProviderBlock from "./ProviderBlock";
import AvatarUploadBtn from "./AvatarUploadBtn";
import { getUserUpdates } from "../../misc/helper";

const Dashboard = ( {onSignOut} ) => {

    const { profile } = useProfile();
    //console.log(profile);
    const onSave = async (newData) => {

      try {
        const updates = await getUserUpdates(profile.uid, 'name', newData, database);
        
        await database.ref().update(updates);

        Alert.success('Nickname has been updated', 4000);
      } catch(err) {
        Alert.error(err.message, 4000);
      }
    }
    return (
        <>
          <Drawer.Header>
            <Drawer.Title>
                Dashboard
            </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <h3>Hey, {profile.name}</h3>
            <ProviderBlock></ProviderBlock>
            <Divider></Divider>
            <EditableInput 
              name = "nickname"
              initialValue={profile.name} 
              onSave={onSave}
              label = {<h6 className="mb-2">Nickname</h6>}
            />
            <AvatarUploadBtn></AvatarUploadBtn>
          </Drawer.Body>

          <Drawer.Footer>
            <Button block appearance="primary" color="red" onClick={onSignOut}>
                Sign Out
            </Button>
          </Drawer.Footer>
        </>
    )
}

export default Dashboard;