import { ScrollView, Text, Button } from "react-native";
import { useAuth } from "@clerk/expo";

const Profile = () => {
    const { signOut } = useAuth();
    
    return (
        <ScrollView
            className='bg-surface-dark flex-1' contentInsetAdjustmentBehavior='automatic'>
            <Text className='text-white'>Profile</Text>
            <Button title="Sign Out" onPress={() => signOut()} />
        </ScrollView>
    );
};

export default Profile;