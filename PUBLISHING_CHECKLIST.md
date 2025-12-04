# Publishing Checklist

## Package.json Status ✅

- ✅ **Name**: `shru-design-system`
- ✅ **Version**: `0.0.1`
- ✅ **Description**: Set
- ✅ **License**: MIT
- ✅ **Main entry points**: `main`, `module`, `types` configured
- ✅ **Exports**: Configured with CSS export (`./styles`)
- ✅ **Files**: Includes `dist`, `src/tokens`, `scripts`, `globals.css`
- ✅ **Peer dependencies**: React >=18
- ✅ **Keywords**: Added for discoverability
- ✅ **Build script**: Configured

## Pre-Publish Steps

1. **Build the library**:
   ```bash
   npm run build:lib
   ```

2. **Test the build**:
   - Check `dist/` folder exists
   - Verify `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts` are generated
   - Test imports in a separate project

3. **Verify files are included**:
   - `dist/` - Built library
   - `src/tokens/` - Token files
   - `scripts/` - Copy scripts
   - `apps/design-system/styles/globals.css` - CSS file

4. **Test CSS import**:
   ```tsx
   import 'shru-design-system/styles'
   ```

## Publishing

```bash
# Login to npm (if not already)
npm login

# Publish
npm publish --access public
```

## Post-Publish

1. Test installation in a fresh project
2. Verify CSS import works
3. Test theme toggle functionality
4. Update documentation with npm package link

