import React from "react"
import {
    Box,
    FlatList,
    Heading,
    Avatar,
    HStack,
    VStack,
    Text,
    Spacer,
    IconButton,
    NativeBaseProvider,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons";


export default class UserList extends React.Component {
    handleClick = (userId) => {
        this.props.onHeaderClick(userId);
      }
    constructor(props) { super(props) }
 
    render() {
        return (          
            <NativeBaseProvider>
                <Box
                    w={{
                        base: "100%",
                    }}
                >
                    <Heading fontSize="xl" p="4" pb="3" color="primary.50">
                        Usuarios
                    </Heading>
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => (
                            <Box
                                borderBottomWidth="1"
                                _dark={{
                                    borderColor: "gray.600",
                                }}
                                borderColor="coolGray.200"
                                pl="4"
                                pr="5"
                                py="2"
                            >
                                <HStack space={3} justifyContent="space-between">
                                    <Avatar
                                        size="48px"
                                        source={{
                                            uri: item.avatarUrl,
                                        }}
                                    />
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "primary.50",
                                            }}
                                            color="primary.50"
                                            bold
                                        >
                                            {item.fullName}

                                        </Text>
                                        <Text
                                            color="primary.500"
                                            _dark={{
                                                color: "primary.500",
                                            }}
                                        >
                                            {item.userName}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Box>
                                        <IconButton
                                            size="sm"
                                            variant="solid"
                                            _icon={{
                                                as: MaterialIcons,
                                                name: "payments",
                                            }}
                                            value={item.id}
                                            onPress={this.handleClick.bind(this, item.id)}
                                        />
                                    </Box>
                                </HStack>
                            </Box>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </Box>
            </NativeBaseProvider>
        )
    }
}

