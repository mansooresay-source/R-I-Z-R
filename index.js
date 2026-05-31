// ⚠️ ضع آيدي الروم الصوتي الخاص بك هنا بين العلامتين
const VOICE_CHANNEL_ID = "1473405320821866660"; 

// حدث مراقبة خروج البوت المفاجئ أو الطرد من الروم
client.on('voiceStateUpdate', async (oldState, newState) => {
    // التأكد من أن الحدث يخص البوت نفسه
    if (oldState.member.id === client.user.id) {
        // إذا كان البوت في روم سابقاً والآن خرج (صار الروم الجديد null أو undefined)
        if (oldState.channelId && !newState.channelId) {
            console.log("🚨 تنبيه: البوت خرج أو طُرد من الروم! جاري إعادة الدخول تلقائياً...");
            
            // الانتظار ثانيتين للاستقرار
            setTimeout(async () => {
                const channel = client.channels.cache.get(VOICE_CHANNEL_ID);
                if (channel) {
                    try {
                        // استخدام الطريقة البرمجية المناسبة لإصدار discord.js للاتصال بالروم
                        if (channel.guild.me.voice.channelId !== VOICE_CHANNEL_ID) {
                            const { joinVoiceChannel } = require('@discordjs/voice');
                            joinVoiceChannel({
                                channelId: channel.id,
                                guildId: channel.guild.id,
                                adapterCreator: channel.guild.voiceAdapterCreator,
                                selfDeaf: true
                            });
                            console.log("✅ تم إعادة البوت بنجاح إلى الروم الصوتي.");
                        }
                    } catch (error) {
                        console.error("⚠️ فشل إعادة الدخول السريع:", error);
                    }
                }
            }, 2000);
        }
    }
});

