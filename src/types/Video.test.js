import Video from './Video'


describe("Video type", () => {

  it('validates without errors with all fields set to valid values', () => {
    const video = new Video()
    video.title = 'Test Title'
    video.id = 1234
    video.taxonomy_id = 1
    expect(video.validate()).toBeTruthy()
    expect(video.validationErrors.length).toBe(0)
    expect(video.validationState['title']).toBe('success')
  })

  it('validates with errors with all fields empty', () => {
    const video = new Video()
    expect(video.validate()).toBeFalsy()
    expect(video.validationErrors.length).toBe(3)
    expect(video.validationState['title']).toBe('error')
    expect(video.validationState['taxonomy_id']).toBe('error')
    expect(video.validationState['file']).toBe('error')
  })

})
