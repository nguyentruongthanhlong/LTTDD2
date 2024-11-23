import { List, Datagrid, TextField, DeleteButton, EditButton, Create, Edit, SimpleForm, TextInput, SelectArrayInput } from "react-admin";



// "content": [
//     {
//       "userId": 1,
//       "firstName": "string",
//       "lastName": "string",
//       "mobileNumber": "1234567890",
//       "email": "a@gmail.com",
//       "password": "$2a$10$fXXqYpwEJa68Fqe.NUe7L.VYbv9pVnQU615Gz0xUmLBhN5k8j5puK",
//       "roles": [
//         {
//           "roleId": 101,
//           "roleName": "ADMIN"
//         },
//         {
//           "roleId": 102,
//           "roleName": "USER"
//         }
//       ],
//       "address": {
//         "addressId": 1,
//         "street": "20 Tăng Nhơn Phú",
//         "buildingName": "Cao Đẳng Công Thương",
//         "city": "Hồ Chí Minh City",
//         "state": "Alone",
//         "country": "Việt Nam",
//         "pincode": "841234"
//       },

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="id" label="User ID" />
            <TextField source="email" label="Email" />
            <TextField source="firstName" label="firstName" />
            <TextField source="lastName" label="lastName" />
            <TextField source="mobileNumber" label="mobileNumber" />
            <TextField source="roles[0].roleName" label="roles" />
            <TextField source="address.street" label="street" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="userId" label="User ID" disabled />
            <SelectArrayInput 
                source="rolesUpdate" 
                label="Roles" 
                choices={[
                    { roleId: 101, roleName: 'ADMIN' },
                    { roleId: 102, roleName: 'USER' }
                ]}
                optionText="roleName"
                optionValue="roleId"
            />
        </SimpleForm>
    </Edit>
);
