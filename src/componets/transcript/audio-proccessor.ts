const MAX_16BIT_INT = 32767;

declare class AudioWorkletProcessor {
  port: MessagePort;
  constructor();
  process(inputs: Float32Array[][]): boolean;
}

declare function registerProcessor(name: string, processor: any): void;


class AudioProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][]): boolean {
    try {
      const input = inputs[0];
      if (!input) throw new Error('No input');

      // Process each channel and send data separately
      for (let channelIndex = 0; channelIndex < input.length; channelIndex++) {
        const channelData = input[channelIndex];
        if (!channelData) throw new Error(`No channelData for channel ${channelIndex}`);

        // Convert float data to int16 data (directly)
        const int16Array = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          int16Array[i] = channelData[i] * MAX_16BIT_INT;
        }

        // Send the audio data for each channel
        this.port.postMessage({ audio_data: int16Array.buffer, channel: channelIndex });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

registerProcessor('audio-processor', AudioProcessor);
export { AudioProcessor };
