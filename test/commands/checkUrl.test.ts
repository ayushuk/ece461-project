// Import your Oclif command
import CheckUrl from '../../src/commands/checkUrl';

describe('CheckUrl Command', () => {
    it('runs without dependencies', async () => {
      const fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockImplementation(function () {
        return 'no\n'
      })
      jest.spyOn(console, 'log')
    
      // call the command, ensure the file exists
      await CheckUrl.run(['./one-url.txt'])

      expect(console.log).toHaveBeenCalledWith(
        'Dependencies not yet installed. Please run the following command:\n./run install'
      );

      expect(process.exit).toHaveBeenCalledWith(1);
    })
});