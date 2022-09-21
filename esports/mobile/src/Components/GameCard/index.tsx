import { Text, TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
    id: string;
    title: string;
    _count: {
        ads: string;
    }
    bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}


export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container}{...rest}>
            <ImageBackground
                source={{ uri: data.bannerUrl }}
                style={styles.cover}
            >

                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                    style={styles.footer}
                >
                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.ads} anúncios
                    </Text>

                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}